function updateClock(){

let now = new Date();

let hours = now.getHours();

let minutes = now.getMinutes();

let ampm = hours >= 12 ? "PM":"AM";

hours = hours % 12;

hours = hours ? hours : 12;

document.getElementById("time")
.textContent =
hours.toString().padStart(2,"0")
+
":"
+
minutes.toString().padStart(2,"0");

document.getElementById("ampm")
.textContent = ampm;

}

setInterval(updateClock,1000);

updateClock();

function tempColor(temp){

if(temp < 45)
return "#00eaff";

if(temp < 65)
return "#00ff99";

if(temp < 80)
return "#ffaa00";

return "#ff3333";

}

function setTemp(id,value){

let element=document.getElementById(id);

element.textContent=value+"°";

element.style.color=tempColor(value);

element.style.textShadow =
"0 0 18px "+tempColor(value);

}

window.nzxt={

v1:{

onMonitoringDataUpdate:function(data){

let cpu=null;

let gpu=null;

if(data.cpus && data.cpus.length){

cpu=Math.round(
data.cpus[0].temperature
);

}

if(data.gpus && data.gpus.length){

gpu=Math.round(
data.gpus[0].temperature
);

}

if(cpu!==null)

setTemp(
"cpu",
cpu
);

if(gpu!==null)

setTemp(
"gpu",
gpu
);

}

}

};
