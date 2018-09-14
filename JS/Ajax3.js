$("#fa-search").on("click",function(){
    $("#fa-search").hide(500,function(){
         $(".search").show();    
    });
});

$("#fa-times").on("click",function(){
   var a = $("input").val();
   if(a === ""){
    $(".search").hide(500,function(){
        //如果input输入框中没有任何的元素，点击X则会出现放大镜样式 
        $("#fa-search").show();  

        // 点完 X 后，需要将之前设置的样式恢复，比如恢复Click icon to search
        $("#prompt").show();
        $(".a-style").css("padding", "200px 10px 5px 0")

        //需要清楚上一次搜索来的全部数据
        $(".result").html("");
   });
   }else{
    //    如果input输入框中还有元素，则会先将输入框的元素清空。不要在“”中加空格
    $("input").val("");
   }
})


$("input").on("keydown", function(event){
    if(event.key == "enter" || event.keyCode == 13){
        //以下是先取到json值 
        getBaiKeResualt();
        //当按键是enter时，第一个div会往上移动 ，且Click icon to search会被隐藏
        $("#prompt").css("display","none");           
        $(".a-style").css("padding", "30px 10px 5px 0");
    }
})

function getBaiKeResualt(){
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var value = $("input").val();
    $.ajax({
        url: api + value + cb,
        type: "GET", //配置 http 请求方法
        dataType: "jsonp", //配置返回数据类型
        success: function(data){
            console.log(data);
            var pages = data.query.pages;
            var b = "";
            // pageLink 是对搜索出来的条目的链接，会新建一个窗口，打开所点击的条目
            var pageLink = 'https://en.wikipedia.org/?curid=';
            for(var index  in  pages){  //取get中的一维key，第一层的key，index是对象的下标，从1开始递增1
                b += "<a class='result-display' target='_blank' href= '" 
                + pageLink + pages[index].pageid + "'> <h2>" 
                + pages[index].title +"</h2>" + "<p class='context'>  "
                + pages[index].extract+"</p>"+"</a>";
            }
            $(".result").hide().html(b).slideDown(1000);
        }
    })
    .fail(function(jqXHR) {
        console.log( "error" );
    })
    .always(function(jqXHR) {
    //console.log(jqXHR);
    console.log( "complete" );
    });
}
