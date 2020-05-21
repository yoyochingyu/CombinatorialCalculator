const express = require("express"),
            app = express(),
            bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

// Pass varaibles into view(index)
app.use("/",(req,res,next)=>{
    res.locals.permutationResult = permutationResult;
    res.locals.combinationResult = combinationResult;
    res.locals.arrangeResult = arrangeResult;
    res.locals.selectResult = selectResult;
    next();
});

app.use("/function-relation",(req,res,next)=>{
    res.locals.crossResult = crossResult;
    res.locals.relationResult = relationResult;
    res.locals.oneToOne = oneToOne;
    res.locals.ontoResult = ontoResult;
    res.locals.stirlingResult = stirlingResult;
    res.locals.eulaResult = eulaResult;
    next();
})

app.use("/numbers",(req,res,next)=>{
    res.locals.catalanResult = catalanResult;
    res.locals.triangularResult = triangularResult;
    res.locals.harmonicResult = harmonicResult;
    res.locals.fibonacciResult = fibonacciResult;
    res.locals.lucasResult = lucasResult;
    next();
})

// variable setting
var A,B;
var permutationResult=combinationResult=arrangeResult =selectResult =   null;
var crossResult  = relationResult =oneToOne =ontoResult =stirlingResult =eulaResult =  null;
var catalanResult  = triangularResult =harmonicResult =fibonacciResult =lucasResult =  null;

// Index Route functions
function factorial(N){
    if(N==0 || N==1){
        return 1;
    }
    let fact = 1;
    for(let i=1;i<=N;i++){
        fact*=i;
    }
    return fact;
}

function permutation(N,R){
    let den = factorial(N);
    let num = factorial(N-R);
    return den/num;
}

function combination(N,R){
    let den = factorial(N);
    let num = factorial(R)*factorial(N-R);
    return den/num;
}

function onto(A,B){
    let onto = 0;
    for(let i=0;i<=B;i++){
        onto+=(Math.pow(-1,i))*combination(B,B-i)*Math.pow(B-i,A);
    }
    return onto;
}

function eula(A,B){
    let eulaResult = 0;
    for(let i=0;i<=B;i++){
        eulaResult+=(Math.pow(-1,i))*combination(A+1,i)*Math.pow(B+1-i,A);
    }
    return eulaResult;
}

function triangular(N){
    let triangularResult = 0;
    for(let i=1;i<=N;i++){
        triangularResult+=i;
    }
    return triangularResult;
}

function harmonic(N){
    let harmonicResult= 0;
    for(let i=1;i<=N;i++){
        harmonicResult+=(1/i);
    }
    return harmonicResult;
}

function fibonacci(N){
    if(N==0){
        return 0;
    }
    if(N==1|| N==2){
        return 1;
    }
    return fibonacci(N-1)+fibonacci(N-2);
}

function lucas(N){
    if(N==0){
        return 2;
    }
    if(N==1){
        return 1;
    }
    return lucas(N-1)+lucas(N-2);
}

    app.get("/",(req,res)=>{
        res.render("index");
    });

    app.post("/",(req,res)=>{
        let N = parseInt(req.body.input.N);
        let R = parseInt(req.body.input.R);
        if(req.body.action=='permutation'){
            permutationResult = permutation(N,R);
        }
        else if(req.body.action=='combination'){
            combinationResult = combination(N,R);
        }
        else if(req.body.action=='arrange'){
            arrangeResult = Math.pow(N,R);
        }
        else if(req.body.action=='select'){
            selectResult = combination(N+R-1,R);
        }
        else{
            permutationResult = permutation(N,R);
            combinationResult = combination(N,R);
            arrangeResult = Math.pow(N,R);
            selectResult = combination(N+R-1,R);
        }
        res.redirect("/");
    });

    app.get("/function-relation",(req,res)=>{
        res.render("func");
    });

    app.post("/function-relation",(req,res)=>{
        A = parseInt(req.body.input.A);
        B = parseInt(req.body.input.B);
        crossResult = A*B;
        relationResult = Math.pow(2,A*B);
        if(A<B){
            oneToOne = permutation(B,A)
            onto = 0;
        }
        else if(A>B){
            oneToOne = 0;
            ontoResult = onto(A,B);
            stirlingResult = ontoResult/factorial(B);
        }
        else{
            oneToOne = permutation(B,A)
            ontoResult = onto(A,B);
            stirlingResult = ontoResult/factorial(B);
        }
        if(A-1>=B>=0){
            eulaResult = eula(A,B);
        }else{
            eulaResult = 0;
        }

        res.redirect("/function-relation");
    });

    app.get("/numbers",(req,res)=>{
        res.render("numbers");
    });

    app.post("/numbers",(req,res)=>{
        N = parseInt(req.body.input.N);
        catalanResult = combination(2*N,N)/(N+1);
        triangularResult = triangular(N);
        harmonicResult = harmonic(N);
        fibonacciResult = fibonacci(N);
        lucasResult = lucas(N);
        res.redirect("/numbers");
    })


    app.listen(8000,()=>{
        console.log("Server has started!");
    });