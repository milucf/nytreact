var Article=require("../models/Article.js");

module.exports=function(app){

    app.get("/api/saved",function(req,res){
        Article.find({},function(err,docs){
            res.json(docs);
        });
    });

    app.post("/api/saved",function(req,res){
        var article={
            title:req.body.title,
            url: req.body.url,
            date: req.body.date
        };
        var newArticle=new Article(article);
        newArticle.save(function(error,doc){
            res.json(doc);
        });
    });

    app.delete("/api/saved/:docid",function(req,res){
        Article.findOneAndRemove({_id:req.params.docid},function(err,doc){
            res.json(doc);
        });
    });

}