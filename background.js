// Create a menu item
// https://webextension-api.thunderbird.net/en/stable/menus.html#create-createproperties-callback
browser.menus.create({
  id: "devnodesFilterSender",
  title: "Devnodes.in: Quick Filter Sender",
  contexts: ["message_list"]
});

function dump_ojb(obj) {
  return JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
}

// Add a listener for when the menu item is clicked
browser.menus.onClicked.addListener((info, tab) => {
  // Check if the clicked menu item is "devnodesFilterSender"
  if (info.menuItemId == "devnodesFilterSender") {
    if (info.selectedMessages.messages[0].author) {
      email_id = info.selectedMessages.messages[0].author
      console.log("[devnodesFilterSender]: " + email_id);

      // Sample code: https://github.com/thundernest/sample-extensions/blob/master/manifest_v2/quickfilter/background.js
      // https://webextension-api.thunderbird.net/en/stable/mailTabs.html#setquickfilter-tabid-properties
      browser.mailTabs.setQuickFilter({
        text: {
          text: email_id,
          author: true,
        },
      });
    } else {
      console.log("[wow]: send address undefined");
    }
  }
});

console.log('Quick Filter Context Menu loaded');
