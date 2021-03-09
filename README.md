# CS97Project
Created by Terry Chen, Gregory Clark, Roye Fang, Karim Saraipour, Michelle Xie

Remainder: From greatest to least priority
 
    * LoginPage/Firebase/Routing
        * Update 2/28: Register page now posts user data onto
        a collection in mongoDB. We should update the login   
        page to authenticate users. The plan is have the search 
        bar search through the entire database, instead of a 
        "contacts" system.     

        * unique usernames are implemented, so if you try to 
          register someone else's username you can't. but if you
          use a valid username, it doesn't take you anywhere either 
          and you remain on the register page. need to fix this                               

    
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
          File, emoji button do nothing currently as well, but should
          be fairly easy to implement when we get to that point. 

    * Themes                        - Everyone does 1 theme
        * For Inspiration : https://windowsterminalthemes.dev/

    * Things to consider/low priority tasks: 
        * Animations with CSS (fading, etc.)
        * Profile management (deleting account, changing username, etc.)
        * Searching content          
        * Group messaging
        * Small description when hovering over icons