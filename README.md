# Elternsprechtag

> "Elternsprechtag" [ˈɛltɐnˌʃpʁɛçtaːk], German noun: parents' day, parent–teacher conference, parent–teacher interview, parent–teacher night, or parent teacher meeting.

## What does this do
This script helps schedule appointments based on peoples' availabilities.

It maximizes the amount of appointments using the [Hopcroft–Karp algorithm](https://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm), based on [this implementation](https://github.com/Tom-Alexander/hopcroft-karp).

It can for example be used for a parent-teacher conference, to schedule meetings with as many parents as possible.

## How to set up
The code is intended to run on Apps Script within GoogleSheets, with Google Forms used for data collection.

### Google Forms
The use of Google Forms is optional, the script also works with manual data entry. If you want to skip Google Forms, you can find instructions below on how to set up your Google Sheet.

If you choose to use a Google Form, set one up with only two questions: One for identification and one with a list of checkboxes for all available times.<br>
(Note: For data protection reasons, I recommend using random pseudonymized codes instead of real names for identification.)

![image](https://github.com/malfynnction/elternsprechtag/assets/24372341/a6e1daf3-2c57-45f0-b24b-32f2747ec3bc)

Then head to the "Responses" Tab and link it to Google Sheets. It will create a GoogleSheet with a "Form responses 1" tab for you, so you will only need to create the "Schedule" tab (see below).

### The sheet
You need a Spreadsheet with two sheets: One as the data source and one to display the results.

For best compatibility with GoogleForms as a data source, I chose "Form responses 1" as the default name for the source tab. The default name for the results tab is "Schedule".

You can of course choose different names for your sheets, just remember to also change the names in the script accordingly!

![image](https://github.com/malfynnction/elternsprechtag/assets/24372341/9ca5f7d4-850c-4add-a166-0e75725d1f6e)

#### "Form responses 1"

This sheet will be used as the data source. It has three columns: timestamp, name, and a comma-separated list of available times (with or without spaces in between)

This will be created automatically if you choose to use Google Forms for your data collection. If you don't want to use Google Forms, just create a sheet that looks like this and then enter your data manually.

![image](https://github.com/malfynnction/elternsprechtag/assets/24372341/01ce104d-ccfd-4ac6-b1bb-f37591f454c1)

The timestamp column will be ignored, it is only there for compatibility with Google Forms. Similarly, the text in the header row does not matter. Just make sure that you have a header row, because the first row will be ignored by the code.

#### "Schedule"

This is where the result will be printed. The code will again ignore the first row, so feel free to use whatever header you want.

![image](https://github.com/malfynnction/elternsprechtag/assets/24372341/0021c953-c642-4b55-ba77-361849c95a68)

### Apps Script

Once you have set up both sheets, you can connect to Apps Script. Do this by choosing "Apps Scripts" from the "Extensions" menu:

![image](https://github.com/malfynnction/elternsprechtag/assets/24372341/79c02c48-cdc1-4605-875c-d8f00b42f074)

You will see something like this:

![image](https://github.com/malfynnction/elternsprechtag/assets/24372341/08969175-8310-4069-a0dc-1a6cd20892c3)

Replace all code with this [script](https://github.com/malfynnction/elternsprechtag/blob/main/Code.gs).

If you now enter data into "Form Responses 1" and then run the `index` function, you should see a result in your "Schedule" sheet.

![image](https://github.com/malfynnction/elternsprechtag/assets/24372341/a4d07cac-4e2d-4b1e-be34-a5ea9a41371c)
