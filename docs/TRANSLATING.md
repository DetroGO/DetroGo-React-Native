# Translating DetroGo

DetroGo should feel usable in the languages people actually speak, not just English.

If you know one of the supported languages and want to help translate the app, this guide is for you. The goal is simple: make the app clear, natural, and easy to use.

No over-formal wording. No word-by-word translation. No machine-translation slop.

## Available languages

English is the source language.

Current target languages on Crowdin:


| Code | Language  |
| ---- | --------- |
| `hi` | Hindi     |
| `kn` | Kannada   |
| `ml` | Malayalam |
| `mr` | Marathi   |
| `ta` | Tamil     |
| `te` | Telugu    |


More languages can be added later if people are actually willing to help translate and review them.

If you want a language added, open an issue and tell us which language you want to work on.

## Where translations live

The English source file is:

```txt
i18n/locales/en.json
```

Translated files live in the same folder:

```txt
i18n/locales/hi.json
i18n/locales/kn.json
i18n/locales/ml.json
i18n/locales/mr.json
i18n/locales/ta.json
i18n/locales/te.json
```

But for normal translation work, you should use Crowdin instead of directly editing these files.

## Best way to translate

Use Crowdin.

Basic flow:

1. Open the DetroGo Crowdin project.
2. Pick your language.
3. Translate the pending strings.
4. Check the string context before submitting.
5. Review your own translations once.
6. Crowdin exports the translated JSON file to GitHub.
7. Maintainers merge the localization branch into `main`.

You usually do not need to open a manual GitHub PR just to translate strings.

## GitHub flow

Crowdin uses a localization branch, usually something like:

```txt
l10n-main
```

or whatever service branch is configured.

That branch should only contain translation file updates, like:

```txt
i18n/locales/hi.json
i18n/locales/ta.json
i18n/locales/kn.json
```

If a translation PR changes app code, package files, lockfiles, or random config, something is probably wrong.

## What to translate

Translate only user-facing text.

That means stuff the user can actually see in the app:

- buttons
- labels
- empty states
- errors
- settings text
- route text
- onboarding text
- permission messages
- short helper text

## What not to translate

Do not translate JSON keys.

Correct:

```json
{
  "search": {
    "placeholder": "translated text goes here"
  }
}
```

Wrong:

```json
{
  "translated_key": {
    "translated_nested_key": "translated text goes here"
  }
}
```

Only the value changes. The key stays the same.

## Do not change placeholders

Placeholders must stay exactly the same.

Examples:

```txt
{towards}
{switchingToLine}
{count}
{name}
{{value}}
%s
%d
```

You can move placeholders around if your language needs a different sentence order, but do not rename them.

Correct:

```txt
Route to {station}
```

Can become something like:

```txt
Translated sentence with {station}
```

Wrong:

```txt
Translated sentence with {DoNotChangethisvalue}
```

If the placeholder changes, the app can break.


## Style

Keep it short.

This is a mobile app. Long translations can overflow, wrap badly, or make the UI look broken.

A good translation should be:

- clear
- natural
- short
- consistent
- easy to understand while travelling

Do not write like a textbook.
Do not write like a government form.
Do not write like a legal notice.
Do not translate every word just because it exists in English.

Translate the meaning, not the sentence structure.

## Tone

DetroGo should sound simple and useful.

Think of it like app UI, not an essay.

Good UI text usually feels like:

- a clear button
- a short label
- a helpful error
- a simple instruction

Bad UI text feels like:

- a paragraph stuffed into a button
- a sentence nobody would actually say
- a direct machine translation
- formal wording that makes the app harder to use

If your translation is technically correct but sounds weird, fix it.

## Keep common words common

Every language has normal words people already use for apps, maps, metro systems, and phones.

Use those.

Do not force overly pure or uncommon words if regular users would not understand them.

For example, words related to apps, metro lines, stations, route planning, settings, notifications, and location should sound like what people actually use in daily life.

The point is not to show off vocabulary.
The point is to make the app usable.

## Be consistent

Use the same word for the same concept throughout the app.

Do not translate the same concept three different ways unless the context actually changes.

Important concepts to keep consistent:


| Concept       |
| ------------- |
| Station       |
| Route         |
| Line          |
| Interchange   |
| Search        |
| Nearby        |
| Saved         |
| Recent        |
| Settings      |
| Language      |
| Location      |
| Notifications |


Before submitting, quickly scan nearby strings and check if the same terms are already translated somewhere else.

## Station and line names

Be careful with station names and line names.

Station names should usually stay as official names unless the app already has localized station names.

Do not randomly translate station names.

Metro line names should stay understandable and familiar. If people commonly use a borrowed/local mixed form in your language, use that. If the official name is usually kept in English, keep it.

Consistency matters more than trying to sound fancy.

## Buttons and labels

Buttons should be short.

Avoid full sentences inside buttons unless absolutely needed.

Good button text usually has 1-3 words.

Examples of button types:

```txt
Search
Save
Cancel
Start
Done
Try again
Use location
Change language
```

Translate these in the shortest natural way for your language.

## Errors and empty states

Errors should be clear, not dramatic.

Tell the user what happened and what they can do next.

Bad style:

```txt
An unexpected and unfortunate issue has occurred while processing your request.
```

Better style:

```txt
Something went wrong. Try again.
```

Keep it human.

## Permissions text

Permission-related strings should be clear and honest.

For example, if the app asks for location, the text should explain why:

```txt
We use your location to find nearby stations.
```

Do not make permission text scary.
Do not hide what the permission is for.
Do not over-explain it either.

## Numbers, time, and units

Keep numbers readable.

Examples:

```txt
2 stops
5 min
1 interchange
```

Translate the words around the numbers, but keep the number itself simple unless your language has a strong reason to format it differently.

Be careful with plural forms. If your language needs different forms for `1` and `2+`, tell maintainers if the current string setup does not support that properly.

## When English is unclear

Sometimes the English source string may be vague.

Do not guess blindly.

Comment on Crowdin or open an issue if:

- the English string does not make sense
- you cannot tell where the string appears
- the same word could mean different things
- a placeholder looks wrong
- the sentence is too long for app UI
- the translation needs plural support
- you need screenshot/context to translate properly

Bad context creates bad translations. Asking is better than guessing.

## Crowdin QA

Crowdin may show QA warnings.

Do not ignore them blindly.

Common QA warnings:

- placeholder mismatch
- punctuation mismatch
- translation much longer than source
- missing variable
- duplicate translation
- suspicious formatting

Some warnings are harmless, but placeholder warnings are serious. Fix those before submitting.

## Local JSON check

If you ever edit a locale file manually, make sure the JSON is valid.

Example:

```bash
python3 -m json.tool i18n/locales/hi.json > /tmp/locale-check.json
```

Replace `hi.json` with the file you changed.

If the command fails, the JSON is broken. Fix it before opening a PR.

## Adding a new language

If Crowdin exports a new language file, maintainers need to register it in the app code.

Example:

```ts
import ta from "@/i18n/locales/ta.json";
```

Then the language needs to be added to the locale list used by the app.

If you are only translating on Crowdin, you do not need to worry about this. Maintainers will handle it.

## Pull request checklist

A translation PR should usually only touch files inside:

```txt
i18n/locales/
```

Before submitting, check:

- JSON is valid.
- Placeholders are unchanged.
- Keys are unchanged.
- Text is not too long for mobile UI.
- Tone sounds natural.
- Common terms are consistent.
- Station and line names are handled carefully.
- The translation does not sound like raw machine translation.

## Final rule

Make it sound like a real person using a metro app would understand it instantly.

That is the whole thing.
