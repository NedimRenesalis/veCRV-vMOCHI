// SPDX-License-Identifier: AGPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IVMochi.sol";
contract vMochi is IVMochi {
    /// CONSTANTS
    int128 public constant DEPOSIT_FOR_TYPE = 0;
    int128 public constant CREATE_LOCK_TYPE = 1;
    int128 public constant INCREASE_LOCK_AMOUNT = 2;
    int128 public constant INCREASE_UNLOCK_TIME = 3;

    uint256 public constant WEEK = 7 days;
    uint256 public constant MAXTIME = 4 * 365 days;
    uint256 public constant MULTIPLIER = 10 ** 18;
    
    event Deposit(address indexed provider, uint256 value, uint256 indexed locktime, int128 depositType, uint256 ts);
    event Withdraw(address indexed provider, uint256 value, uint256 ts);
    event Supply(uint256 prevSupply, uint256 supply);

    IERC20 public immutable mochi;
    uint256 public supply;
    mapping(address => LockedBalance) internal lockedData;
    uint256 public epoch;
    mapping(uint256 => Point) public pointHistory;
    mapping(address => mapping(uint256 => Point)) public userPointHistory;
    mapping(address => uint256) public userPointEpoch;

    mapping(uint256 => int128) public slopeChanges;
    mapping(address => mapping(address => bool)) public approved;

    string public name = "vMochi";
    string public symbol = "vMOCHI";
    string public version = "v1";
    uint8 public decimals = 18;

    constructor(address _mochi) {
        mochi = IERC20(_mochi);
        pointHistory[0].blk = block.number;
        pointHistory[0].ts = block.timestamp;
    }
    
    function getLastUserSlope(address _user) public view returns(int128) {
        uint256 uepoch = userPointEpoch[_user];
        return userPointHistory[_user][uepoch].slope;
    }

    function userPointHistoryTs(address _user, uint256 _idx) public view returns(uint256){
        return userPointHistory[_user][_idx].ts;
    }

    function locked(address _user) public override view returns(LockedBalance memory) {
        return lockedData[_user];
    }

    function lockEnd(address _user) public view returns(uint256) {
        return lockedData[_user].end;
    }

    function _checkPoint(address _user, LockedBalance memory _oldLocked, LockedBalance memory _newLocked) internal {
        Point memory uOld;
        Point memory uNew;
        int128 oldSlope = 0;
        int128 newSlope = 0;

        uint256 _epoch = epoch;

        if(_user != address(0)){
            if(_oldLocked.end > block.timestamp && _oldLocked.amount > 0){
                uOld.slope = _oldLocked.amount / int128(int256(MAXTIME));
                uOld.bias = uOld.slope * int128(int256(_oldLocked.end - block.timestamp));
            }
            if(_newLocked.end > block.timestamp && _newLocked.amount > 0){
                uNew.slope = _newLocked.amount / int128(int256(MAXTIME));
                uNew.bias = uNew.slope * int128(int256(_newLocked.end - block.timestamp));
            }

            oldSlope = slopeChanges[_oldLocked.end];
            if(_newLocked.end != 0){
                if(_newLocked.end == _oldLocked.end){
                    newSlope = oldSlope;
                } else {
                    newSlope = slopeChanges[_newLocked.end];
                }
            }
        }
        Point memory lastPoint = Point({
            bias: 0,
            slope: 0,
            ts: block.timestamp,
            blk: block.number
        });
        if(_epoch > 0){
            lastPoint = pointHistory[_epoch];
        }

        uint256 lastCheckpoint = lastPoint.ts;
        {
        Point memory initialLastPoint = Point({
            bias: lastPoint.bias,
            slope: lastPoint.slope,
            ts: lastPoint.ts,
            blk: lastPoint.blk
        });
        uint256 blockSlope = 0;
        if(block.timestamp > lastPoint.ts){
            blockSlope = MULTIPLIER * (block.number - lastPoint.blk) / (block.timestamp - lastPoint.ts);
        }

        uint256 t_i = (lastCheckpoint / WEEK) * WEEK;
        for(uint256 i = 0; i<255; i++){
            t_i += WEEK;
            int128 dSlope = 0;
            if(t_i > block.timestamp){
                t_i = block.timestamp;
            } else {
                dSlope = slopeChanges[t_i];
            }
            lastPoint.bias -= lastPoint.slope * int128(int256(t_i - lastCheckpoint));
            lastPoint.slope += dSlope;
            if(lastPoint.bias < 0){
                lastPoint.bias = 0;
            }
            if(lastPoint.slope < 0){
                lastPoint.slope = 0;
            }

            lastCheckpoint = t_i;
            lastPoint.ts = t_i;
            lastPoint.blk == initialLastPoint.blk + blockSlope * (t_i - initialLastPoint.ts) / MULTIPLIER;
            _epoch += 1;
            if(t_i == block.timestamp){
                lastPoint.blk = block.number;
                break;
            } else {
                pointHistory[_epoch] = lastPoint;
            }
        }

        epoch = _epoch;
        if(_user != address(0)){
            lastPoint.slope += uNew.slope - uOld.slope;
            lastPoint.bias += uNew.bias - uOld.bias;
            if(lastPoint.slope < 0){
                lastPoint.slope = 0;
            }
            if(lastPoint.bias < 0){
                lastPoint.bias = 0;
            }
        }
        }
        pointHistory[_epoch] = lastPoint;
        if(_user != address(0)){
            if(_oldLocked.end > block.timestamp) {
                oldSlope += uOld.slope;
                if(_newLocked.end == _oldLocked.end){
                    oldSlope -= uNew.slope;
                }
                slopeChanges[_oldLocked.end] = oldSlope;
            }
            if(_newLocked.end > block.timestamp) {
                if(_newLocked.end > _oldLocked.end){
                    newSlope -= uNew.slope;
                    slopeChanges[_newLocked.end] = newSlope;
                }
            }
            uint256 userEpoch = ++userPointEpoch[_user];
            uNew.ts = block.timestamp;
            uNew.blk = block.number;
            userPointHistory[_user][userEpoch] = uNew;
        }
    }

    function exchangeRate() public view returns(int128) {
        if(supply == 0){
            return int128(1e18);
        }
        return int128(int256(1e18 * mochi.balanceOf(address(this)) / supply));
    }

    function checkPoint() external {
        _checkPoint(address(0), LockedBalance({amount: 0, end:0}), LockedBalance({amount:0, end:0}));
    }

    function approve(address _approvee, bool _flag) external {
        approved[msg.sender][_approvee] = _flag;
    }

    function createLock(uint256 _value, uint256 _unlockAt) external {
        createLockFor(msg.sender, _value, _unlockAt);
    }

    function createLockFor(address _user, uint256 _value, uint256 _unlockAt) public {
        require(_user == msg.sender || approved[_user][msg.sender], "!owner || !approved");
        uint256 unlockTime = (_unlockAt / WEEK) * WEEK;
        require(_value > 0, "zero value");
        require(unlockTime > block.timestamp, "Can only lock until time in the future");
        require(unlockTime <= block.timestamp + MAXTIME, "Voting lock can be 4 years max");
        LockedBalance memory _lockedData = lockedData[_user];
        require(_lockedData.amount == 0, "Withdraw old mochis first");

        _depositFor(_user, _value, unlockTime, _lockedData, CREATE_LOCK_TYPE);
    }

    function increaseAmount(uint256 _value) external {
        depositFor(msg.sender, _value);
    }

    function depositFor(address _user, uint256 _value) public override {
        LockedBalance memory _lockedData = lockedData[_user];
        require(_value > 0, "zero value");
        require(_lockedData.amount > 0, "No existing lock found");
        require(_lockedData.end > block.timestamp, "Cannot add to expired lock. Withdraw");
        _depositFor(_user, _value, 0, _lockedData, DEPOSIT_FOR_TYPE);
    }

    function increaseUnlockTime(uint256 _unlockTime) external {
        LockedBalance memory _lockedData = lockedData[msg.sender];
        uint256 unlockTime = (_unlockTime / WEEK) * WEEK;
        require(_lockedData.amount > 0, "No existing lock found");
        require(_lockedData.end > block.timestamp, "Lock expired");
        require(unlockTime > _lockedData.end, "Can only increase lock duration");
        require(unlockTime <= block.timestamp + MAXTIME, "Voting lock can be 4 years max");
        _depositFor(msg.sender, 0, unlockTime, _lockedData, INCREASE_UNLOCK_TIME);
    }

    function _depositFor(address _user, uint256 _value, uint256 _unlockTime, LockedBalance memory _lockedData, int128 _type) internal {
        uint256 supplyBefore = supply;
        supply += _value * 1e18 / uint256(int256(exchangeRate()));
        if(_value != 0){
            mochi.transferFrom(msg.sender, address(this), _value); // ;)
        }
        LockedBalance memory oldLocked = lockedData[_user];
        _lockedData.amount += int128(int256(_value)) * 1e18 / exchangeRate();
        if(_unlockTime != 0){
            _lockedData.end = _unlockTime;
        }
        lockedData[_user] = _lockedData;
        _checkPoint(_user, oldLocked, _lockedData);


        emit Deposit(_user, _value, _lockedData.end, _type, block.timestamp);
        emit Supply(supplyBefore, supplyBefore + _value);
    }

    function withdrawFor(address _user) external {
        require(_user == msg.sender || approved[_user][msg.sender], "!owner || !approved");
        _withdraw(_user);
    }

    function withdraw() external {
        _withdraw(msg.sender);
    }

    function _withdraw(address _user) internal {
        LockedBalance memory _lockedData = lockedData[_user];
        require(block.timestamp >= _lockedData.end, "!expired");
        uint256 value = uint256(int256(_lockedData.amount));

        LockedBalance memory oldLocked = lockedData[_user];
        _lockedData.end = 0;
        _lockedData.amount = 0;
        lockedData[_user] = _lockedData;

        uint256 withdrawAmount = value * uint256(int256(exchangeRate()))/ 1e18;
        mochi.transfer(_user, withdrawAmount);
        uint256 supplyBefore = supply;
        supply -= value;

        _checkPoint(_user, oldLocked, _lockedData);
        emit Withdraw(_user, withdrawAmount, block.timestamp);
        emit Supply(supplyBefore, supplyBefore - value);
    }

    function _findBlockEpoch(uint256 _block, uint256 _maxEpoch) internal view returns(uint256) {
        uint256 min = 0;
        uint256 max = _maxEpoch;

        for(uint256 i = 0; i<128; i++){
            if( min >= max){
                break;
            }
            uint256 mid = (min + max + 1) / 2;
            if(pointHistory[mid].blk <= _block){
                min = mid;
            } else {
                max = mid - 1;
            }
        }
        return min;
    }

    function balanceOf(address _user) external override view returns(uint256){
        return balanceOf(_user, block.timestamp);
    }

    function balanceOf(address _user, uint256 _t) public view returns(uint256){
        uint256 _epoch = userPointEpoch[_user];
        if(epoch == 0){
            return 0;
        } else {
            Point memory lastPoint = userPointHistory[_user][_epoch];
            lastPoint.bias -= lastPoint.slope * int128(int256(_t - lastPoint.ts));
            if(lastPoint.bias < 0){
                lastPoint.bias = 0;
            }
            return uint256(int256(lastPoint.bias));
        }
    }

    function balanceOfAt(address _user, uint256 _block) external view returns(uint256){
        require(_block <= block.number, "!valid");
        uint256 min = 0;
        uint256 max = userPointEpoch[_user];
        for(uint256 i = 0; i<128; i++){
            if(min >= max){
                break;
            }
            uint256 mid = (min + max + 1) / 2;
            if(userPointHistory[_user][mid].blk <= _block){
                min = mid;
            } else {
                max = mid - 1;
            }
        }

        Point memory uPoint = userPointHistory[_user][min];

        uint256 maxEpoch = epoch;
        uint256 _epoch = _findBlockEpoch(_block, maxEpoch);
        Point memory point0 = pointHistory[_epoch];
        uint256 dBlock = 0;
        uint256 dt = 0;

        if(_epoch < maxEpoch){
            Point memory point1 = pointHistory[_epoch + 1];
            dBlock = point1.blk - point0.blk;
            dt = point1.ts - point0.ts;
        } else {
            dBlock = block.number - point0.blk;
            dt = block.timestamp - point0.ts;
        }
        uint256 blockTime = point0.ts;
        if(dBlock != 0){
            blockTime += dt * (_block - point0.blk) / dBlock;
        }
        uPoint.bias -= uPoint.slope * int128(int256(blockTime - uPoint.ts));
        if(uPoint.bias >= 0){
            return uint256(int256(uPoint.bias));
        } else {
            return 0;
        }
    }

    function supplyAt(Point memory _point, uint256 _t) internal view returns(uint256){
        uint256 t_i = (_point.ts / WEEK) * WEEK;

        for(uint256 i = 0; i<255; i++){
            t_i += WEEK;
            int128 dSlope = 0;
            if(t_i > _t){
                t_i = _t;
            } else {
                dSlope = slopeChanges[t_i];
            }
            _point.bias -= _point.slope * int128(int256(t_i - _point.ts));
            if(t_i == _t){
                break;
            }
            _point.slope += dSlope;
            _point.ts = t_i;
        }

        if(_point.bias < 0){
            _point.bias = 0;
        }
        return uint256(int256(_point.bias));
    }

    function totalSupply() external view returns(uint256) {
        return totalSupply(block.timestamp);
    }

    function totalSupply(uint256 _t) public view returns(uint256) {
        uint256 _epoch = epoch;
        Point memory lastPoint = pointHistory[_epoch];
        return supplyAt(lastPoint, _t);
    }

    function totalSupplyAt(uint256 _block) external view returns(uint256) {
        require(_block <= block.number, "!valid");
        uint256 _epoch = epoch;
        uint256 targetEpoch = _findBlockEpoch(_block, _epoch);

        Point memory point = pointHistory[targetEpoch];
        uint256 dt = 0;

        if(targetEpoch < _epoch) {
            Point memory pointNext = pointHistory[targetEpoch + 1];
            if(point.blk != pointNext.blk){
                dt = (_block - point.blk) * (pointNext.ts - point.ts) / (pointNext.blk - point.blk);
            }
        } else {
            if(point.blk != block.number) {
                dt = (_block - point.blk) * (block.timestamp - point.ts) / (block.number - point.blk);
            }
        }

        return supplyAt(point, point.ts + dt);
    }
}

