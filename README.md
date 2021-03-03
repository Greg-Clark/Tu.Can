# CS97Project
Created by Terry Chen, Gregory Clark, Roye Fang, Karim Saraipour, Michelle Xie

Remainder: From greatest to least priority
 
    * LoginPage/Firebase/Routing
        * Update 2/28: Register page now posts user data onto
        a collection in mongoDB. We should update the login   
        page to authenticate users. The plan is have the search 
        bar search through the entire database, instead of a 
        "contacts" system.                                    

    * Sidebar functionality
        * We need the sidebar to actually work
        * sidebar go brrr
    
    * Look into deploying
        * Real-time messages between users (rather than sending locally)
        * This needs to be done last

    * Sending media                 - Terry and Karim
        * Backup: EMOJIS
        Idea: Create a div of a specific size that will contain a snapshot of what the media will look like
        Whether you send a youtube video or an image, It'll send a message of the same size snap shot
        (like a youtube thumbnail)
                    //////////////////////////
                    //                      //
                    //                      //
                    //                      //
                    //                      //      visual done by T.A.U.
                    //        media         //
                    //                      //
                    //                      //
                    //                      //
                    //                      //
                    //////////////////////////

    * General CSS                   - Roye, Greg, and Karim
        * Update 3/01: Karim and Greg did major styling updates
          to the messaging page. Some bugs that are persisting:
            when first loading into the chat, you load into the
            top part of a message thread, i.e. the oldest messages
            come first, and you have to scroll down to see the newest
            messages being sent. Also when clicking the 'paper 
            airplane' icon to send a message, if the message field
            is blank, then it will send a blank message. We don't 
            want this behavior to be happening.
          File, emoji button do nothing currently as well, but should
          be fairly easy to implement when we get to that point. 

    * Themes                        - Everyone does 1 theme
        * For Inspiration : https://windowsterminalthemes.dev/

    * Things to consider/low priority tasks: 
     <s>* Private routing</s>
        * Animations with CSS (fading, etc.)
        * Profile management (deleting account, changing username, etc.)
        * Searching content          
        * Group messaging

    * Things not to consider:
        * tic-tac-toe
        * wet burritos
        * dropdown menus