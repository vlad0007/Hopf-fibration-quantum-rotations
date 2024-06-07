// hopf.js

let canvas_hopf; 	// Ссылка на элемент по его идентификатору (id = "canvas_hopf") для отображения 3D-модели.
let scene_hopf, camera_hopf, renderer_hopf, orbitControl_hopf;	// стандартные объекты three.js

let cylinderGeometry

let torusGeometry;
let torus;
let thick_circles = 0.1;
let thick_lines = 0.1;
let axes;
let is_axes = false;
let is_spiral = false;

let a = 20;

// массив THREE.Mesh
let save_torus = [];

let CIRCLES = true;
let LINES = false;
let FOUR = false;
let FIVE = false;
let SEVEN = false;

function hopf_circles()
{
	canvas_hopf = document.getElementById("canvas_hopf");

	///////////////////////////////////////////////	
	// Создаем трехмерную сцену, камеру и рендерер
	///////////////////////////////////////////////
	scene_hopf = new THREE.Scene();

	const width = canvas_hopf.width;
	const height = canvas_hopf.height;
	const aspect = width / height;
	
	camera_hopf = new THREE.OrthographicCamera( -a, a, a/aspect, -a/aspect, 1, 2000 ); 
	
	camera_hopf.position.x = 80;
	camera_hopf.position.y = 0;
	camera_hopf.position.z = 0;
	
	camera_hopf.lookAt(new THREE.Vector3(0, 0, 0));	
	scene_hopf.add(camera_hopf);
	
	// Создаем renderer
	renderer_hopf = new THREE.WebGLRenderer({canvas: canvas_hopf, antialias: true});
	// renderer_hopf = new THREE.WebGLRenderer({canvas: canvas_hopf});
	renderer_hopf.setSize(canvas_hopf.width, canvas_hopf.height);
	renderer_hopf.setClearColor(0xFFFFFF);
	// Элемент управления дающий возможность осматривать модели со всех сторон.
	orbitControl_hopf = new THREE.OrbitControls(camera_hopf, canvas_hopf);	
/*
	// свет
	const light_1 = new THREE.PointLight( 0xffffff, 0.8, 0 );
	light_1.position.set( 100, 200, 100 );
	scene.add( light_1 );

	const light_2 = new THREE.PointLight( 0xffffff, 0.8, 0 );
	light_2.position.set( - 100, - 200, - 100 );
	scene.add( light_2 );
*/

	let bt = document.getElementById('btn_thick1');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_thick2');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_thick3');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_circles');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_lines');
	bt.style.background = '#bbbbbb';
	
	recalc_hopf_circles();	

	render_hopf();
}

function recalc_hopf_circles()
{
	const beta = polar_electron/2 + Math.PI/2;
	const fi = azimuth_electron + Math.PI/2;
	const center = new Point3D;
	center[0] = pt_cross[0];
	center[1] = pt_cross[1];
	center[2] = pt_cross[2];

	const pt1 = new Point3D(0, -rs, 0 )
	const pt2 = new Point3D(pt_cross[0], pt_cross[1], pt_cross[2]);
	const R = pt1.Distance(pt2);
	
	const torusMaterial = new THREE.MeshNormalMaterial( {color: 0xff0000} );
	const cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff, transparent: false, opacity: 0.9} );

	if (CIRCLES == true)
	{	
		if (polar_electron > 179*DEGREE)
		{	
			cylinderGeometry = new THREE.CylinderGeometry( thick_circles, thick_circles, 40000, 10 ); 
			torus = new THREE.Mesh( cylinderGeometry, torusMaterial );
			
			torus.position.x = 0;
			torus.position.y = 0;
			torus.position.z = 0;
		}
		else
		{							
			torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 100 ); 
			// torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 6 ); 
			torus = new THREE.Mesh( torusGeometry, torusMaterial );
			
			torus.position.x = center[0];
			torus.position.y = center[1];
			torus.position.z = center[2];

			torus.rotation.order = 'XYZ';
			torus.rotation.x = beta;
			torus.rotation.order = 'YXZ';
			torus.rotation.y = fi;
		}
	}
	else if (LINES == true)
	{	
		cylinderGeometry = new THREE.CylinderGeometry( thick_circles, thick_circles, 80000, 10 ); 
		// здесь под объектом torus подразумеваем объект cylinder 
		// для сохранения в одном и том же массиве save_torus
		torus = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
		if (polar_electron > 179*DEGREE)
		{	
			torus.position.x = 0;
			torus.position.y = 0;
			torus.position.z = 0;
		}
		else
		{
			torus.position.x = center[0];
			torus.position.y = center[1];
			torus.position.z = center[2];

			torus.rotation.order = 'XYZ';
			torus.rotation.x = beta;
			torus.rotation.order = 'YXZ';
			torus.rotation.y = fi;	
		}
	}
	else if (FOUR == true)
	{	
		if (polar_electron > 179*DEGREE)
		{	
			cylinderGeometry = new THREE.CylinderGeometry( thick_circles, thick_circles, 40000, 10 ); 
			torus = new THREE.Mesh( cylinderGeometry, torusMaterial );
			
			torus.position.x = 0;
			torus.position.y = 0;
			torus.position.z = 0;
		}
		else
		{							
			torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 4 ); 
			// torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 6 ); 
			torus = new THREE.Mesh( torusGeometry, torusMaterial );
			
			torus.position.x = center[0];
			torus.position.y = center[1];
			torus.position.z = center[2];

			torus.rotation.order = 'XYZ';
			torus.rotation.x = beta;
			torus.rotation.order = 'YXZ';
			torus.rotation.y = fi;
		}
	}	
	else if (FIVE == true)
	{	
		if (polar_electron > 179*DEGREE)
		{	
			cylinderGeometry = new THREE.CylinderGeometry( thick_circles, thick_circles, 40000, 10 ); 
			torus = new THREE.Mesh( cylinderGeometry, torusMaterial );
			
			torus.position.x = 0;
			torus.position.y = 0;
			torus.position.z = 0;
		}
		else
		{							
			torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 5 ); 
			// torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 6 ); 
			torus = new THREE.Mesh( torusGeometry, torusMaterial );
			
			torus.position.x = center[0];
			torus.position.y = center[1];
			torus.position.z = center[2];

			torus.rotation.order = 'XYZ';
			torus.rotation.x = beta;
			torus.rotation.order = 'YXZ';
			torus.rotation.y = fi;
		}
	}
	else if (SEVEN == true)
	{	
		if (polar_electron > 179*DEGREE)
		{	
			cylinderGeometry = new THREE.CylinderGeometry( thick_circles, thick_circles, 40000, 10 ); 
			torus = new THREE.Mesh( cylinderGeometry, torusMaterial );
			
			torus.position.x = 0;
			torus.position.y = 0;
			torus.position.z = 0;
		}
		else
		{							
			torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 7 ); 
			// torusGeometry = new THREE.TorusGeometry( R, thick_circles, 16, 6 ); 
			torus = new THREE.Mesh( torusGeometry, torusMaterial );
			
			torus.position.x = center[0];
			torus.position.y = center[1];
			torus.position.z = center[2];

			torus.rotation.order = 'XYZ';
			torus.rotation.x = beta;
			torus.rotation.order = 'YXZ';
			torus.rotation.y = fi;
		}
	}		
	
	scene_hopf.add(torus);
	
	save_torus.push(torus);
	
	for (let i = 0; i < save_torus.length; i++)
	{
		scene_hopf.add(save_torus[i]);
		
	}
}

function clear_hopf()
{
	for (let i = 0; i < save_torus.length; i++)
	{
		scene_hopf.remove(save_torus[i]);
	}
	save_torus.length = 0;
}	

function check_axes()
{	
	const bt = document.getElementById('btn_check');
	if (is_axes == false)
	{
		is_axes = true;	
		bt.checked = true;
		//////// Истинные оси координат /////
		axes = new THREE.AxesHelper(50);
		axes.position.set(0, 0, 0);
		scene_hopf.add(axes);		
	}
	else
	{
		is_axes = false;	
		bt.checked = false;
		scene_hopf.remove(axes);
	}
}

function spiral()
{	
	const bt = document.getElementById('btn_check_spiral');
	if (is_spiral == false)
	{
		is_spiral = true;	
		bt.checked = true;
	}
	else
	{
		is_spiral = false;	
		bt.checked = false;		
	}
}

function Thick1()
{	
	let bt = document.getElementById('btn_thick1');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_thick2');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_thick3');
	bt.style.background = '#bbbbbb';
	thick_circles = 0.05;
	recalc_hopf_circles();
}

function Thick2()
{	
	let bt = document.getElementById('btn_thick2');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_thick1');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_thick3');
	bt.style.background = '#bbbbbb';
	thick_circles = 0.25;
	recalc_hopf_circles();
}

function Thick3()
{		
	let bt = document.getElementById('btn_thick3');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_thick1');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_thick2');
	bt.style.background = '#bbbbbb';
	thick_circles = 0.55;
	recalc_hopf_circles();
}


function Circles()
{	
	CIRCLES = true;
	
	LINES = false;
	FOUR = false;
	FIVE = false;
	SEVEN = false;

	let bt = document.getElementById('btn_circles');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_lines');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_4');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_5');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_7');
	bt.style.background = '#bbbbbb';	
	
	// thick_circles = 0.10;
	recalc_hopf_circles();
}

function Lines()
{	
	LINES = true;
	
	CIRCLES = false;
	FOUR = false;
	FIVE = false;
	SEVEN = false;

	let bt = document.getElementById('btn_lines');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_circles');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_4');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_5');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_7');
	bt.style.background = '#bbbbbb';
	
	CIRCLES = false;
	
	// thick_circles = 0.10;
	recalc_hopf_circles();
}

function Four()
{	
	FOUR = true;
	
	CIRCLES = false;
	LINES = false;
	FIVE = false;
	SEVEN = false;

	let bt = document.getElementById('btn_4');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_circles');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_lines');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_5');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_7');
	bt.style.background = '#bbbbbb';
	
	CIRCLES = false;
	
	// thick_circles = 0.10;
	recalc_hopf_circles();
}

function Five()
{	
	FIVE = true;
	
	CIRCLES = false;
	LINES = false;
	FOUR = false;
	SEVEN = false;

	let bt = document.getElementById('btn_5');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_circles');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_lines');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_4');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_7');
	bt.style.background = '#bbbbbb';
	
	CIRCLES = false;
	
	// thick_circles = 0.10;
	recalc_hopf_circles();
}

function Seven()
{	
	SEVEN = true;
	
	CIRCLES = false;
	LINES = false;
	FIVE = false;
	FOUR = false;

	let bt = document.getElementById('btn_7');
	bt.style.background = '#44dd44';
	
	bt = document.getElementById('btn_circles');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_lines');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_4');
	bt.style.background = '#bbbbbb';
	
	bt = document.getElementById('btn_5');
	bt.style.background = '#bbbbbb';
	
	CIRCLES = false;
	
	// thick_circles = 0.10;
	recalc_hopf_circles();
}

function render_hopf() 
{
	orbitControl_hopf.enabled = true;
	renderer_hopf.render(scene_hopf, camera_hopf);		
	requestAnimationFrame(render_hopf);
}
