/**
 * Created by zhubg on 2017/5/13.
 */

import moment from 'moment';


function getPosts() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(new Date());
        } , 3000);
    });
}

async function printPostsToConsole() {
    for (let i = 0 ;i<20;i++){
        const date = await getPosts();
        console.log(date);
    }
}

printPostsToConsole();