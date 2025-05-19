## How to Modify Navigation Links in index.html

This guide explains how to update the two sets of navigation links in your `index.html` file:
1.  **Direct Navbar Links:** Links visible directly in the navigation bar.
2.  **Dropdown Menu Links:** Links accessible via the "Menu" button in the navigation bar.

These links are dynamically generated based on two separate JavaScript objects.

**1. Locate the Link Configuration Objects:**

*   Open your `index.html` file.
*   Scroll down to the `<script>` section, typically located near the end of the HTML document.
*   Within the `DOMContentLoaded` event listener function, you will find two JavaScript objects:
    *   `const directNavConfigMap = { ... };` - This object controls the **Direct Navbar Links**.
    *   `const navTextMap = { ... };` - This object controls the **Dropdown Menu Links**.

    ```javascript
    // Example structure

    // Configuration for DIRECT NAVIGATION BAR LINKS
    const directNavConfigMap = {
      business: {
        'strategy': 'Strategy', 
        'landing': 'Landing Zone',
        'steps': 'Next Steps'
      },
      technical: {
        'executive-summary': 'Summary',
        'secure-network-architecture': 'Network Arch',
        'next-steps': 'Next Steps'
      }
    };

    // Navigation text mapping for DROPDOWN MENU
    const navTextMap = {
      business: {
        'strategy': 'End-to-End Strategy',
        'readiness': 'Cloud Readiness',
        // ... more links for business dropdown
        'steps': 'Next Steps'
      },
      technical: {
        'executive-summary': 'Executive Summary',
        'foundational-security-pillars': 'Security Pillars',
        // ... more links for technical dropdown
        'next-steps': 'Next Steps'
      }
    };
    ```

**2. Understanding the Structure (Applies to Both Objects):**

*   Both `directNavConfigMap` and `navTextMap` contain two primary keys: `business` and `technical`.
*   Each of these keys maps to an inner object that defines the navigation links for that respective view and for that specific navigation area (direct navbar or dropdown).
*   Within these inner objects (e.g., `directNavConfigMap.business` or `navTextMap.technical`), each entry is a `key: 'value'` pair:
    *   **`key` (e.g., `'strategy'`):** This string represents the **ID of the HTML section** the link should navigate to. Ensure a corresponding HTML element (like `<section id="strategy">`) exists in your document.
    *   **`'value'` (e.g., `'Strategy'` or `'End-to-End Strategy'`):** This string is the **display text** for the link that users will see.

**3. How to Add, Modify, or Remove Links:**

The process is the same for both `directNavConfigMap` (for direct navbar links) and `navTextMap` (for dropdown menu links). Simply choose the correct object based on which set of links you want to change.

*   **To Add a New Link:**
    *   Decide if the link is for the "Business" or "Technical" view.
    *   In the chosen object (`directNavConfigMap` or `navTextMap`), navigate to the relevant view (`business` or `technical`).
    *   Add a new line with your `key: 'value'` pair. Remember commas between entries.
    *   **Example (adding to Direct Navbar - Business):**
        ```javascript
        // In directNavConfigMap
        business: {
          'strategy': 'Strategy',
          'landing': 'Landing Zone',
          'steps': 'Next Steps', // Add comma if not last
          'new-contact': 'Contact Us' // New direct link
        },
        ```
    *   **Crucial:** Ensure you have a corresponding HTML section with the ID used as the key (e.g., `<section id="new-contact">...</section>`).

*   **To Modify an Existing Link:**
    *   Find the link in the appropriate object and view.
    *   **Change display text:** Edit the `'value'`.
    *   **Change target section:** Edit the `key` (and update the corresponding HTML section's `id`).

*   **To Remove a Link:**
    *   Delete the entire `key: 'value'` line from the appropriate object and view.
    *   Adjust commas as needed.

**4. Key Differences and Usage:**

*   **`directNavConfigMap`:** Use this for a smaller, curated set of primary navigation links that you want to be always visible in the navbar. You might use shorter text for these links to save space.
*   **`navTextMap`:** Use this for a more comprehensive list of all available sections. This list populates the dropdown menu, where space is less of a concern.

**Important Considerations:**

*   **Save Your Changes:** After modifying `index.html`, save the file.
*   **Reload Your Browser:** Refresh the page to see the changes.
*   **HTML Section IDs:** Ensure that all `key`s in both map objects correctly match the `id` attributes of existing sections in your HTML body.
*   **Independent Control:** Changes to `directNavConfigMap` will only affect the direct navbar links. Changes to `navTextMap` will only affect the dropdown menu links. They are now independent. 