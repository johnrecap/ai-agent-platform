/**
 * Automation Locales
 * All text content for Automation module
 */

export const automationLocales = {
    en: {
        // Page
        pageTitle: 'Automation',
        pageSubtitle: 'Automate your workflows and save time',
        createRule: 'Create Rule',

        // Status
        active: 'Active',
        inactive: 'Inactive',
        paused: 'Paused',

        // Triggers
        triggers: 'Triggers',
        selectTrigger: 'Select Trigger',
        whenThis: 'When this happens...',

        // Actions
        actions: 'Actions',
        addAction: 'Add Action',
        doThis: 'Do this...',

        // Form
        ruleName: 'Rule Name',
        ruleDescription: 'Description',
        enterRuleName: 'Enter automation rule name',
        enterDescription: 'Describe what this automation does',

        // Stats
        executions: 'Executions',
        lastExecuted: 'Last Executed',
        never: 'Never',

        // Actions
        execute: 'Execute',
        pause: 'Pause',
        resume: 'Resume',
        edit: 'Edit',
        delete: 'Delete',
        cancel: 'Cancel',
        save: 'Save',

        // Templates
        templates: 'Templates',
        useTemplate: 'Use Template',
        startFromScratch: 'Start from Scratch',

        // Messages
        ruleCreated: 'Automation rule created successfully',
        ruleUpdated: 'Automation rule updated successfully',
        ruleDeleted: 'Automation rule deleted successfully',
        ruleExecuted: 'Automation rule executed successfully',
        deleteConfirm: 'Are you sure you want to delete this automation rule?',

        // Empty
        noRules: 'No automation rules yet',
        createFirstRule: 'Create your first automation rule',

        // Validation
        nameRequired: 'Name must be at least 3 characters',
        triggerRequired: 'Trigger is required',
        actionsRequired: 'At least one action is required'
    }
};

export const getAutomationText = (key, lang = 'en') => {
    return automationLocales[lang]?.[key] || key;
};
