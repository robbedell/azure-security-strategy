(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.15});
  els.forEach(el=>io.observe(el));
})();

// Layout switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const layoutBtns = document.querySelectorAll('.layout-btn');
  const businessContent = document.getElementById('business-content');
  const technicalContent = document.getElementById('technical-content');
  
  const dropdownButton = document.getElementById('navDropdownButton');
  const dropdownContent = document.getElementById('navDropdownContent');
  const dropdownArrow = document.getElementById('navDropdownArrow');
  const directNavLinksContainer = document.getElementById('directNavLinksContainer');

  const solutionsDropdownButton = document.getElementById('solutionsDropdownButton');
  const solutionsDropdownContent = document.getElementById('solutionsDropdownContent');
  const solutionsDropdownArrow = document.getElementById('solutionsDropdownArrow');

  // Navigation text mapping for DROPDOWN MENU (MAIN)
  const navTextMap = {
    business: {
      'strategy': 'End-to-End Strategy',
      'readiness': 'Cloud Readiness',
      'landing': 'Landing Zone',
      'network': 'Network',
      'security-arch': 'Security',
      'modernization': 'Modernization',
      'steps': 'Next Steps'
      // Add more comprehensive links for the BUSINESS dropdown menu here
    },
    technical: {
      'executive-summary': 'Executive Summary',
      'foundational-security-pillars': 'Security Pillars',
      'identity-and-access-management': 'IAM',
      'secure-network-architecture': 'Secure Network Architecture',
      'data-protection': 'Data Protection',
      'secure-workload-deployment': 'Secure Workload Deployment',
      'monitoring-logging-threat-detection': 'Threat Detection',
      'governance-and-policy-enforcement': 'Governance',
      'secure-remote-access-and-endpoints': 'Secure Remote Access',
      'incident-response-and-recovery': 'Incident Response',
      'layered-security-model-diagram': 'Layered Security Model',
      'next-steps': 'Next Steps'
      // Add more comprehensive links for the TECHNICAL dropdown menu here
    }
  };

  // Configuration for DIRECT NAVIGATION BAR LINKS
  const directNavConfigMap = {
    business: {
      'strategy': 'Strategy',
      'landing': 'Landing Zone',
      'steps': 'Next Steps',
      'https://csrc.nist.gov/publications/detail/sp/800-207/final': 'NIST ZTA (SP 800-207)',
      'https://www.cisecurity.org/controls/': 'CIS Controls',
      'https://learn.microsoft.com/en-us/azure/governance/policy/samples/iso-27001': 'ISO 27001 (Azure)'
    },
    technical: {
      'executive-summary': 'Summary',
      'secure-network-architecture': 'Network Arch',
      'next-steps': 'Next Steps',
      'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1800-5.pdf': 'NIST Cybersecurity Practice Guide (SP 1800-5)',
      'https://www.sans.org/critical-security-controls': 'SANS Critical Controls',
      'https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/aws-security-incident-response-guide.html': 'AWS Incident Response'
    }
  };

  // Configuration for SOLUTIONS DROPDOWN MENU (Static External Links)
  const solutionsLinksMap = {
    'Azure IaaS to Cloud Native Strategy': 'azure_strat.html',
    'Zero Trust Implementation': 'https://example.com/zero-trust-implementation',
    'Managed SIEM/SOAR': 'https://example.com/managed-siem-soar',
    'Compliance Advisory': 'https://example.com/compliance-advisory'
    // Add more "Solution Name": "URL" pairs here
  };

  // Function to populate the Solutions dropdown menu
  function populateSolutionsMenu() {
    solutionsDropdownContent.innerHTML = ''; // Clear existing links
    for (const text in solutionsLinksMap) {
      const url = solutionsLinksMap[text];
      const a = document.createElement('a');
      a.href = url;
      a.textContent = text;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.addEventListener('click', () => { // Close menu on link click
        solutionsDropdownContent.classList.remove('show');
        solutionsDropdownButton.classList.remove('active');
        solutionsDropdownArrow.textContent = '▼';
      });
      solutionsDropdownContent.appendChild(a);
    }
  }

  // Function to update direct navigation links with fade effect
  function updateDirectNavLinks(layout) {
    const links = directNavConfigMap[layout];
    
    directNavLinksContainer.style.opacity = '0'; // Start fade out

    setTimeout(() => {
      directNavLinksContainer.innerHTML = ''; // Clear existing links
      if (links) {
        for (const idOrUrl in links) {
          const a = document.createElement('a');
          a.textContent = links[idOrUrl];
          
          // Check if it's an external link
          if (idOrUrl.startsWith('http')) {
            a.href = idOrUrl;
            a.target = '_blank';
            a.rel = 'noopener noreferrer'; // Security best practice
          } else {
            a.href = '#' + idOrUrl; // Internal anchor link
          }
          directNavLinksContainer.appendChild(a);
        }
      }
      directNavLinksContainer.style.opacity = '1'; // Fade in new links
    }, 150); // Match half of the main content fade duration for smoother transition
  }

  // Function to update dropdown menu content
  function updateDropdownMenu(layout) {
    dropdownContent.innerHTML = ''; // Clear existing links
    const links = navTextMap[layout];
    if (links) {
      for (const id in links) {
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = links[id];
        a.addEventListener('click', () => {
          dropdownContent.classList.remove('show');
          dropdownButton.classList.remove('active');
          dropdownArrow.textContent = '▼';
          // No need to adjust style.display here, class 'show' handles it
        });
        dropdownContent.appendChild(a);
      }
    }
  }

  // Toggle Solutions dropdown visibility and position
  solutionsDropdownButton.addEventListener('click', function(event) {
    event.stopPropagation();
    const isCurrentlyShown = solutionsDropdownContent.classList.contains('show');
    
    // Hide main nav dropdown if open
    if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        dropdownButton.classList.remove('active');
        dropdownArrow.textContent = '▼';
    }

    if (isCurrentlyShown) {
      solutionsDropdownContent.classList.remove('show');
      solutionsDropdownButton.classList.remove('active');
      solutionsDropdownArrow.textContent = '▼';
    } else {
      const buttonRect = solutionsDropdownButton.getBoundingClientRect();
      solutionsDropdownContent.style.top = `${buttonRect.bottom + 5}px`;
      solutionsDropdownContent.style.right = `${document.documentElement.clientWidth - buttonRect.right}px`;
      solutionsDropdownContent.style.left = 'auto';
      
      solutionsDropdownContent.classList.add('show');
      solutionsDropdownButton.classList.add('active');
      solutionsDropdownArrow.textContent = '▲';
    }
  });

  // Toggle Main Nav dropdown visibility and position
  dropdownButton.addEventListener('click', function(event) {
    event.stopPropagation();
    const isCurrentlyShown = dropdownContent.classList.contains('show');

    // Hide solutions dropdown if open
    if (solutionsDropdownContent.classList.contains('show')) {
        solutionsDropdownContent.classList.remove('show');
        solutionsDropdownButton.classList.remove('active');
        solutionsDropdownArrow.textContent = '▼';
    }
    
    if (isCurrentlyShown) {
      dropdownContent.classList.remove('show');
      dropdownButton.classList.remove('active');
      dropdownArrow.textContent = '▼';
    } else {
      // Calculate position before showing
      const buttonRect = dropdownButton.getBoundingClientRect();
      dropdownContent.style.top = `${buttonRect.bottom + 5}px`; // 5px gap below button
      // Align right edge of menu with right edge of button
      dropdownContent.style.left = 'auto'; // Clear left if previously set
      dropdownContent.style.right = `${document.documentElement.clientWidth - buttonRect.right}px`;
      
      dropdownContent.classList.add('show');
      dropdownButton.classList.add('active');
      dropdownArrow.textContent = '▲';
    }
  });

  // Close dropdowns when clicking outside
  window.addEventListener('click', function(event) {
    if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        dropdownButton.classList.remove('active');
        dropdownArrow.textContent = '▼';
      }
    }
    if (!solutionsDropdownButton.contains(event.target) && !solutionsDropdownContent.contains(event.target)) {
      if (solutionsDropdownContent.classList.contains('show')) {
        solutionsDropdownContent.classList.remove('show');
        solutionsDropdownButton.classList.remove('active');
        solutionsDropdownArrow.textContent = '▼';
      }
    }
  });
 
  layoutBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      layoutBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
 
      const selectedLayout = this.dataset.layout;
      updateDropdownMenu(selectedLayout);
      updateDirectNavLinks(selectedLayout);
 
      const currentContent = businessContent.style.display !== 'none' ? businessContent : technicalContent;
      const newContent = selectedLayout === 'business' ? businessContent : technicalContent;
 
      currentContent.style.opacity = '0';
      setTimeout(() => {
        currentContent.style.display = 'none';
        newContent.style.display = 'block';
        newContent.offsetHeight;
        newContent.style.opacity = '1';
      }, 300);
    });
  });

  updateDropdownMenu('business');
  updateDirectNavLinks('business');
  populateSolutionsMenu(); // Initialize Solutions Menu
}); 