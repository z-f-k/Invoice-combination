let str, target, t, assembly;

document.getElementById('count').onclick = function() {
	let start = new Date();
	str = document.getElementById('existing').value;
	target = document.getElementById('target').value;
	if (str == undefined || str == '') {
		return alert('请填写目标金额');
	}
	if (target == undefined || target == '') {
		return alert('请填写发票金额');
	}
	
	t = [];
	assembly = {};
	calculate(str);
	let answer = [],
		distance;
	for (let i in assembly){
		if(distance == undefined){
			distance = Number(i) + Number(target);
		}
		answer.push(assembly[i]);
	}
	if(answer.length == 0){
		document.getElementById('answer').innerHTML = '对不起，您的发票金额还没达到您的预期';
	}else{
		document.getElementById('answer').innerHTML = answer[0];
		document.getElementById('total').innerHTML = distance;
	}
	document.getElementById('time').innerHTML = '用时：' + (new Date() - start) + 'ms';
}

//整数计算上
function calculate(arr) {
	arr = arr.split('-');
	if (arr.length == 0) {
		return
	}
	for (let i = 0; i < arr.length; i++) {
		let child_arr = [];
		let j = 0;
		let total = 0;

		while (j + 1 <= arr.length) {
			if (j != i) {
				child_arr.push(arr[j]);
				total = total + Number(arr[j]);
			}
			j++;
		}
		if (total >= target) {
			let distance = total - target;
			let arrry_str = child_arr.join(',');
			if (assembly[distance] == undefined) {
				assembly[distance] = arrry_str;
				t.push(child_arr);
				arguments.callee(child_arr.join('-'));
			} else {
				let flag = true;
				assembly[distance].split('<br />').forEach(function(item) {
					if (item.length == arrry_str.length) flag = false;
				})
				if (flag) {
					assembly[distance] = assembly[distance] + '<br />' + arrry_str;
					t.push(child_arr);
					arguments.callee(child_arr.join('-'));
				}
			}
		}
	}
}
