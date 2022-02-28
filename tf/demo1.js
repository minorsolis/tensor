	// model
	const model = tf.sequential();
	
	// layer
	const hidden = tf.layers.dense({
		units: 4,
		inputShape:[2],
		activation: 'sigmoid'
	});
	model.add( hidden );

	// output
	const output = tf.layers.dense({
		units: 1,
		activation: 'sigmoid'
	});
	model.add( output );

	// options sgd
	const sgdOptions = tf.train.sgd(0.1);

	// compile
	model.compile({
		optimizer: sgdOptions,
		loss: tf.losses.meanSquaredError
	});

/**
Data example

[ X1 | X2  ]
0   | 0
0.1 | ?
0.2 | 0.2
0.3 | ?
0.4 | 0.4
0.5 | ?

|   /
|  /
| /
|/_ _ _ _ _ 

 */

	const x1 = tf.tensor2d([
		[0,0],
		[0.2, 0.2],
		[0.4, 0.4]
		]);
	const x2 = tf.tensor2d([
		[0.1],
		[0.3],
		[0.5]
		]);
	

	// console.log(x2);

	function getData(){
		let returnValue = "";
		for(i=0;1<x1.length;i++){
			returnValue += "<tr><td>"+x1[i]+"</td><td>"+x2[i]+"</td></tr>";
		}
		return returnValue;
	}


	async function epoch(){
		for(i=0;i<2;i++){
			const result = await model.fit(x1,x2,{suffle:true,epochs:100});
			console.log( "HERE", (result.history.loss[0] * 100).toFixed(2), "%");
			// loss_id.innerHTML = (result.history.loss[0] * 100).toFixed(2)+"%";
		}
	}

	epoch().then((response)=>{
		const salid = model.predict(x1);
		salid.print();
	});