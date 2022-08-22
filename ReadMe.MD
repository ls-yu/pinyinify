#About:#
This is the code for a Chrome extension to display the pinyin pronunciation of Chinese text.

#How to use:#
Highlight Chinese text using your cursor and the extension will display the pinyin pronunciation of the selected text. It only works on Chinese text, it will automatically detect whether the selected text is Chinese. If a lot of text is selected, there will be a scroll bar to scroll through all the pinyin. For characters with multiple possible pronunciations, it will just display the first possible pronunciation. Sometimes if the text is in a different format (instead of regular paragraph text format) the extension will not work.

This extension relies on this Chinese-to-pinyin API: https://helloacm.com/api/pinyin/?cached&

No user information or website information is stored; the Chinese-to-pinyin is done with temporary variables which get cleared every time you unselect the text. I am just a student doing this to help me read Chinese websites.



#Resources Referenced:#
https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors 