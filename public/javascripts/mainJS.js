$(document).ready(()=>{
    $('#btn').click(()=>{
        let qry = $("#input").val();
        if(qry.length<2)return;
        let url = "/api/course";
        let body = {'input':qry};
        $.get(url,body,(data,status)=>{
            let results = $("#result");
            console.log(status);
            results.html(JSON.stringify(data) + ' ' + status);
            
            });
            //console.log(data);
        })
    });

