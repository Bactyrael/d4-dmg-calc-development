---
name: Extract Maxroll Equipment Modifiers
description: Extracts standard and transfigured modifiers from the Maxroll D4 planner UI and injects them into the local database.js file.
---

# Extract Maxroll Equipment Modifiers

When the user asks to extract equipment modifiers from Maxroll (e.g. for Chest, Gloves, Pants, Boots), follow this exact workflow:

## Step 1: Spawn a Standby Browser Agent
Spawn a browser subagent with the following prompt:
> Open a browser session on maxroll.gg/d4/planner and stand by. The user is going to manually control the mouse and navigate to the next equipment modifier window. Once they give the cue, extract all standard Modifiers, then scroll down to the 'Transfigured' section and extract every single Transfigured affix. Wait for my cue to begin.

Notify the user that the agent is on standby and wait for them to navigate to the correct equipment modifiers window and give you the cue.

## Step 2: Cue the Agent
When the user indicates they are ready, send a message to the subagent:
> The user has opened the modifiers menu. Please extract all the standard Modifiers at the top of the list. Then, systematically scroll down to the 'Transfigured' section and carefully extract every single Transfigured affix. Return the complete, categorized list of both when finished.

## Step 3: Format and Inject
When the subagent returns the extracted data, write a Python script (e.g. `patch_equipment.py`) that loads `assets/database.js`, parses the JSON object from `window.D4_DATABASE`, and updates the corresponding slot (e.g. `chest`, `gloves`) in `classData.Necromancer.equipment`. 
Ensure the Python script correctly formats the JSON structure (e.g., standardizing `category` labels and cleaning `[x]` tags), writes the updated string back into `database.js` while maintaining the `window.D4_DATABASE = ` wrapper, and commits the changes via git.

## Step 4: Cleanup
Kill the subagent when the task is complete and notify the user.
