const express = require("express"),
            app = express(),
            bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.use("/",(req,res,next)=>{
    res.locals.permutationResult = permutationResult;
    res.locals.combinationResult = combinationResult;
    res.locals.arrangeResult = arrangeResult;
    res.locals.selectResult = selectResult;
    next();
})

app.use("/function-relation",(req,res,next)=>{
    res.locals.crossResult = crossResult;
    res.locals.relationResult = relationResult;
    res.locals.oneToOne = oneToOne;
    res.locals.ontoResult = ontoResult;
    res.locals.stirlingResult = stirlingResult;
    next();
})

// variable setting
var N,R;
var A,B;
var permutationResult=combinationResult=arrangeResult =selectResult =   null;
var crossResult  = relationResult =oneToOne =ontoResult =stirlingResult =  null;

function factorial(n){
    if(n==0 || n==1){
        return 1;
    }
    let fact = 1;
    for(let i=1;i<=n;i++){
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
    console.log(den);
    console.log(num);
    return den/num;
}

function onto(A,B){
    let onto = 0;
    for(let i=0;i<=B;i++){
        onto+=(Math.pow(-1,i))*combination(B,B-i)*Math.pow(B-i,A);
    }
    return onto;
}

    app.get("/",(req,res)=>{
        res.render("index");
    });

    app.post("/",(req,res)=>{
        N = parseInt(req.body.input.N);
        R = parseInt(req.body.input.R);
        permutationResult = permutation(N,R);
        combinationResult = combination(N,R);
        arrangeResult = Math.pow(N,R);
        selectResult = combination(N+R-1,R);
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

        res.redirect("/function-relation");
    });


    app.listen(8000,()=>{
        console.log("Server has started!");
    });