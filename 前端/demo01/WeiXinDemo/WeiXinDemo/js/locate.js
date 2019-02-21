function motionHandler(e) {
	onSensorChanged(e.x, e.y, e.z); //记录数据
	count = 0;
}

function onSensorChanged(x, y, z) {
	oriValues[0] = x;
	oriValues[1] = y;
	oriValues[2] = z;
	gravityNew = Math.sqrt(oriValues[0] * oriValues[0] + oriValues[1] * oriValues[1] + oriValues[2] * oriValues[2]);
	point = gravityNew;
	detectorNewStep(gravityNew);
}

/*
 * 检测步子，并开始计步
 * 1.传入sersor中的数据
 * 2.如果检测到了波峰，并且符合时间差以及阈值的条件，则判定为1步
 * 3.符合时间差条件，波峰波谷差值大于initialValue，则将该差值纳入阈值的计算中
 * */

function detectorNewStep(values) {
	if(gravityOld == 0) {
		gravityOld = values;
	} else {
		if(detectorPeak(values, gravityOld)) {
			timeOfLastPeak = timeOfThisPeak;
			timeOfNow = Date.now();
			
			console.log("现在时间:"+timeOfNow+"上一个峰值时间"+timeOfLastPeak+"差值"+(timeOfNow-timeOfLastPeak));
			console.log("现在阈值"+ThreadValue+"现峰"+peakOfWave+"谷"+valleyOfWave+"差"+(peakOfWave-valleyOfWave));
			
			if(timeOfNow - timeOfLastPeak >= TimeInterval &&
				(peakOfWave - valleyOfWave >= ThreadValue)) {
				timeOfThisPeak = timeOfNow;
				/*
				 * 更新界面的处理，不涉及到算法
				 * 一般在通知更新界面之前，增加下面处理，为了处理无效运动：
				 * 1.连续记录10才开始计步
				 * 2.例如记录的9步用户停住超过3秒，则前面的记录失效，下次从头开始
				 * 3.连续记录了9步用户还在运动，之前的数据才有效
				 * */
				// mStepListeners.countStep();
				updateUI();
				console.log("计步了 同时更新UI");
			}
			if(timeOfNow - timeOfLastPeak >= TimeInterval &&
				(peakOfWave - valleyOfWave >= InitialValue)) {
				timeOfThisPeak = timeOfNow;
				ThreadValue = peakValleyThread(peakOfWave - valleyOfWave);
			}
		}
	}
	gravityOld = values;
}
/*
 * 检测波峰
 * 以下四个条件判断为波峰：
 * 1.目前点为下降的趋势：isDirectionUp为false
 * 2.之前的点为上升的趋势：lastStatus为true
 * 3.到波峰为止，持续上升大于等于2次
 * 4.波峰值大于5
 * 记录波谷值
 * 1.观察波形图，可以发现在出现步子的地方，波谷的下一个就是波峰，有比较明显的特征以及差值
 * 2.所以要记录每次的波谷值，为了和下次的波峰做对比
 *
 */

function detectorPeak(newValue, oldValue) {
	console.log("持续上升计数"+continueUpCount+"新值"+newValue+"老值"+oldValue);
	lastStatus = isDirectionUp;
	if(newValue >= oldValue) {
		isDirectionUp = true;
		continueUpCount++;
	} else {
		continueUpFormerCount = continueUpCount;
		continueUpCount = 0;
		isDirectionUp = false;
	}

	if(!isDirectionUp && lastStatus &&
		(continueUpFormerCount >= 1 || oldValue >= 5)) { //这里是计步的重要判读
		peakOfWave = oldValue;
		return true;
	} else if(!lastStatus && isDirectionUp) {
		valleyOfWave = oldValue;
		return false;
	} else {
		return false;
	}
}

/*
 * 阈值的计算
 * 1.通过波峰波谷的差值计算阈值
 * 2.记录4个值，存入tempValue[]数组中
 * 3.在将数组传入函数averageValue中计算阈值
 * */
//用于存放计算阈值的波峰波谷差值

function peakValleyThread(value) {
	var tempThread = ThreadValue;
	if(tempCount < ValueNum) {
		tempValue[tempCount] = value;
		tempCount++;
	} else {
		tempThread = averageValue(tempValue, ValueNum);
		for(var i = 1; i < ValueNum; i++) {
			tempValue[i - 1] = tempValue[i];
		}
		tempValue[ValueNum - 1] = value;
	}
	return tempThread;
}

/*
 * 梯度化阈值
 * 1.计算数组的均值
 * 2.通过均值将阈值梯度化在一个范围里
 * */
function averageValue(value, n) {
	var ave = 0;
	for(var i = 0; i < n; i++) {
		ave += value[i];
	}
	ave = ave / ValueNum;
	if(ave >= 8)
		ave = 4.3;
	else if(ave >= 7 && ave < 8)
		ave = 3.3;
	else if(ave >= 4 && ave < 7)
		ave = 2.3;
	else if(ave >= 3 && ave < 4)
		ave = 2.0;
	else {
		ave = 1.3;
	}
	return ave;
}