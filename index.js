const HOOK_MODULES = ['UFICentralUpdates'];
const UPDATE_FEEDBACK_EVENT = 'update-feedback';
const DEFAULT_SUPPORTED_REACTIONS_COUNT = 6;
const HIDDEN_REACTION_TYPE_IDS = [11,12,14,15];

function hookFacebookReactions() {
  if(window.requireLazy) {
    window.requireLazy(HOOK_MODULES,
      (UFICentralUpdates) => {
        UFICentralUpdates.subscribe(UPDATE_FEEDBACK_EVENT, (eventName, feedbackObj) => {
          var supportedReactions = feedbackObj.feedbacktarget.supportedreactions;
          if(supportedReactions.length === DEFAULT_SUPPORTED_REACTIONS_COUNT) {
            supportedReactions = [...supportedReactions, ...HIDDEN_REACTION_TYPE_IDS]; 
            feedbackObj.feedbacktarget.supportedreactions = supportedReactions;
            UFICentralUpdates.inform(UPDATE_FEEDBACK_EVENT, feedbackObj);
          }
        });
      }
    );
  } else {
    console.error('Failed to inject Facebook Reactions hook.');
  }
}
hookFacebookReactions();
