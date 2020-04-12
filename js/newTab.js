let searchbar,searchIcon;
let list_item_template,list_item_node;
window.onload=function(){
    searchbar=document.querySelector('.search-bar');
    searchIcon=document.querySelector('.search-icon');
    list_item_template=document.querySelector('.list-item-template');
    list_item_node=document.importNode(list_item_template.content,true);
    addTopSites();
    searchIcon.addEventListener('click',()=>{
        newTab.search();
    });
    searchbar.addEventListener('keyup',e=>{
       if(e.which==13){
           newTab.search();
       }
    });
}

let newTab={
    search:function(){
       let query=searchbar.value;
       if(query.trim()!=''){
        window.location.href=`https://www.google.com/search?q=${query}`
       }
    }
}

function addTopSites(){
    chrome.topSites.get(topSites=>{
        topSites=topSites.slice(0,8);
        topSites.forEach(site=>{
            let node=list_item_node.cloneNode(true);
            node.querySelector('.label').textContent=site.title!=""?site.title:site.url;
            node.querySelector('.list-item').title=site.title; 
            node.querySelector('.list-item').href=site.url; 
            let logo=node.querySelector('.site-icon');
            logo.innerText=site.title[0];
            document.querySelector('.top-sites').appendChild(node);
        })
    })
}


