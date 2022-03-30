/*var word = {
    A:["01110","10001","10001","10001","11111","10001","10001","00000"],
    B:["11110","10001","10001","11110","10001","10001","11110","00000"],
    C:["01110","10001","10000","10000","10000","10001","01110","00000"],
    D:["11100","10010","10001","10001","10001","10010","11100","00000"],
    E:["11111","10000","10000","11110","10000","10000","11111","00000"],
    F:["11111","10000","10000","11110","10000","10000","10000","00000"],
    G:,
    H:["10001","10001","10001","11111","10001","10001","10001","00000"],
    I:,
    L:,
    M:,
    N:,
    O:,
    P:,
    Q:,
    R:,
    S:,
    T:,
    U:,
    V:,
    W:,
    X:,
    Y:,
    Z:,
}*/

document.querySelectorAll(".dot-px").forEach(element => element.addEventListener("click", 
    function(){
        element.classList.toggle("high")
    })
)

var enable = 0

document.querySelectorAll(".dot-px").forEach(element => element.addEventListener("mouseover", function(){if(enable == 1){element.classList.add("high")}else if(enable == 2){element.classList.remove("high")}}))

document.querySelectorAll(".box-char").forEach(
    function(element){ 
        element.addEventListener("mousedown", function(){enable = 1})
        element.addEventListener("mouseup", function(){enable = 0})
        element.addEventListener("dblclick", function(){if(enable == 0){enable = 1}else{enable = 0}})
        element.addEventListener('contextmenu', function(e){e.preventDefault(); enable = 2});
    }
)

var interval = setInterval(function(){draw(); textResult()}, 100)

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var m = 0;
    if(document.querySelector("#link").checked == true){
        document.querySelector("#range2").value = document.querySelector("#range").value
    }
    var basicSize = document.querySelector("#range").value
    var circWeight = document.querySelector("#range2").value

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,40/2 * 5,40/2 * 7)

    for(var j = 0; j < 8; j++){
        for(var i = 0; i < 5; i++){
            if(document.querySelectorAll(".dot-px")[m].classList.contains("high")){
                let radgrad = ctx.createRadialGradient(i * basicSize/3 + basicSize/2, j * basicSize/3 + basicSize/2, 1, i * basicSize/3 + basicSize/2, j * basicSize/3 + basicSize/2, circWeight/3);
                radgrad.addColorStop(0, '#FFF');
                radgrad.addColorStop(1, 'transparent');
            
                ctx.fillStyle = radgrad;
                ctx.fillRect(0,0,40/2 * 5,40/2 * 7);
            }
            m++;
        }
    }
}

document.querySelector("#copyToClip").addEventListener("click", function(){navigator.clipboard.writeText(this.copy)})

function textResult(){
    var copyclip = "";
    document.querySelector("#r").querySelectorAll("p").forEach(
        function(element,item){
            var result = ""
            for(var i = 0; i < 5; i++){
                result += (document.querySelectorAll(".dot-px")[item * 5 + i].classList.contains("high") === true ? 1 : 0).toString()
            }
            element.textContent =(item == 0 ? "[" : "") + '"' + result + '"' + (item == 7 ? "]" : ",")
            copyclip += element.textContent;
        }
    )
    document.querySelector("#copyToClip").copy = copyclip;
}  

