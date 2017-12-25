var axios = require("axios");

var helpers = {   
      search: function(topic,startYear,endYear) {
        var nyurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+topic+"&begin_date="+
                   startYear+"0101&end_date="+endYear+"1230&api-key=1d6ab8fe6cb546f78a25f7df1998ae01";

        return axios.get(nyurl).then(function(articles) {
                     var newdocs=[];
                     for (var i=0;i<articles.data.response.docs.length;i++){
                      var doc={
                        title:articles.data.response.docs[i].headline.main,
                        url:articles.data.response.docs[i].web_url,
                        date:articles.data.response.docs[i].pub_date
                      };
                      newdocs.push(doc);
                     }
                     

                     return newdocs;
                      
                        });        
      },

      savingArticle:function(title,url,date){
        var doc={title:title,url:url,date:date};
        return axios.post("/api/saved",doc).then(function(article) {
          return article
        });
      },

      getSavedArticles: function() {
        return axios.get("/api/saved").then(function(articles) {
                    return articles
        });
      },

      deleteArticle: function(articleId) {
        return axios.delete("/api/saved/"+articleId).then(function(article) {
                    return article
        });
      }
    };
    //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=trump&api-key=1d6ab8fe6cb546f78a25f7df1998ae01
    module.exports = helpers;