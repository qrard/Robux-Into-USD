// ==UserScript==
// @name         Roblox Robux to USD Converter
// @namespace    http://tampermonkey.net/
// @version      v1.1
// @description  Fetch Robux and convert to USD
// @author       qrard
// @match        https://www.roblox.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Constants
    const ROBUX_TO_USD = 0.0145;

    // Create the GUI
    const gui = document.createElement('div');
    gui.id = 'robux-to-usd-gui';
    gui.style.position = 'fixed';
    gui.style.top = '40px'; // Move 40px down from the top
    gui.style.right = '10px';
    gui.style.padding = '10px';
    gui.style.backgroundColor = 'transparent'; // Transparent background
    gui.style.border = 'none'; // No border
    gui.style.zIndex = '1000';
    gui.style.boxShadow = 'none'; // No box shadow
    gui.style.fontFamily = 'Arial, sans-serif';
    gui.style.fontSize = '24px';
    gui.style.color = '#ffffff'; // Font color set to white

    // Hide button
    const hideButton = document.createElement('button');
    hideButton.textContent = 'Hide';
    hideButton.style.marginLeft = '10px';
    hideButton.style.backgroundColor = '#4CAF50'; // Green background color
    hideButton.style.color = 'white'; // White text color
    hideButton.style.border = 'none'; // No border
    hideButton.style.padding = '5px 10px'; // Padding
    hideButton.addEventListener('click', function() {
        gui.style.display = 'none';
    });
    gui.appendChild(hideButton);

    document.body.appendChild(gui);

    // Fetch Robux balance
    function fetchRobux() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://economy.roblox.com/v1/user/currency',
            onload: function(response) {
                if (response.status === 200) {
                    const data = JSON.parse(response.responseText);
                    const robux = data.robux;
                    const usd = (robux * ROBUX_TO_USD).toFixed(2);
                    updateGui(robux, usd);
                } else {
                    updateGui('Error', 'Error');
                }
            },
            onerror: function() {
                updateGui('Error', 'Error');
            }
        });
    }

    // Update the GUI
    function updateGui(robux, usd) {
        // Clear existing content
        gui.innerHTML = '';

        // Create elements for Robux and USD
        const robuxElement = document.createElement('div');
        robuxElement.innerHTML = `<strong>Robux:</strong> ${robux}`;
        robuxElement.style.fontWeight = 'bold'; // Make text bold
        robuxElement.style.textShadow = '1px 1px 2px #000'; // Add text outline
        gui.appendChild(robuxElement);

        const usdElement = document.createElement('div');
        usdElement.innerHTML = `<strong>USD:</strong> $${usd}`;
        usdElement.style.fontWeight = 'bold'; // Make text bold
        usdElement.style.textShadow = '1px 1px 2px #000'; // Add text outline
        gui.appendChild(usdElement);

        // Re-add hide button
        gui.appendChild(hideButton);
    }

    // Initial fetch
    fetchRobux();

})();
