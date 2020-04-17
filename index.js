var str,target,group,t,gap;

document.getElementById('count').onclick = function(){
	str = document.getElementById('existing').value;
	target = document.getElementById('target').value;
	if(str == undefined || str == ''){
		return alert('请填写目标金额');
	}
	if(target == undefined || target == ''){
		return alert('请填写发票金额');
	}
	
	str = str + '-0';
	t = [];
	gap = 100;
	(function a(arr) {
		var arr1 = arr.split('-');
		if (arr1.length == 1) {
			return
		}
		for (var i = 0; i < arr1.length; i++) {
			var arr2 = [];
			var index = 0;
			var to = 0;
	
			while (index + 1 <= arr1.length) {
				if (index != i) {
					arr2.push(arr1[index]);
					to = to + Number(arr1[index]);
				}
				index++;
			}
			if (to >= target) {
				if (to - target <= gap) {
					t.push(arr2);
					gap = to - target;
					group = arr2;
					var b = arr2.join('-');
					arguments.callee(b);
				}
			}
		}
	})(str);
	document.getElementById('answer').innerHTML = group;
}


