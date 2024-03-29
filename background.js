//set the initial text on the extension icon (badge text)
chrome.runtime.onInstalled.addListener(()=>{
    chrome.action.setBadgeText({
        text:"OFF",
    });
});

//Callback funtion is called when the extension icon is clicked.
chrome.action.onClicked.addListener(async (tab) => {
    if(true){
        const prevState = await chrome.action.getBadgeText({tabId: tab.id}) //getting the badge text
        const nextState = prevState === "ON" ? "OFF" : "ON" //set the next badge text
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        })

        //Injecting the css file
        if(nextState === "ON"){
            await chrome.scripting.insertCSS({
                files: ["focus-mode.css"],
                target : {tabId:tab.id},
            })
        }

        //removing the css file
        else if (nextState === "OFF") {
            await chrome.scripting.removeCSS({
              files: ["focus-mode.css"],
              target: { tabId: tab.id },
            });
        }
    }
});