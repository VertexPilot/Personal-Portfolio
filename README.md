# Pasindu Lakshan — Game Developer Portfolio

A static HTML/CSS/JavaScript portfolio redesigned with a futuristic dark UI, purple/cyan neon accents, glass panels, responsive project cards, and learning/education sections. The existing images, résumé, and dedicated project detail pages are retained.

## Open locally

1. Extract the ZIP while keeping the complete `Source_Folder` structure.
2. Open `Source_Folder/index.html` in a modern browser, or upload the folder contents to your existing static website host.
3. Keep `images/`, `CV/`, and `Wireframes/` in their current relative locations.

No build step or paid dependency is required.

## Main files

- `index.html` — redesigned landing page and project cards.
- `neon.css` — new purple/cyan visual theme and responsive styles.
- `site.js` — mobile navigation, theme persistence, active section highlighting, copy-email, and contact-form behavior.
- `style.css` — original styles kept for compatibility with the existing pages.
- `project-*.html` — project detail pages linked from the home page.
- `CV/Pasindu Lakshan Resume.pdf` — résumé download/view file.

## Update your work

- Change name, copy, skills and profile details in `index.html`.
- Update social links in `index.html` if any of them change.
- The 3D modelling, animation, IoT and prototype gallery tiles marked `ADD YOUR ...` are intentional placeholders for screenshots/renders that were not present in the uploaded source. Replace each placeholder `div.gallery-placeholder` in the related `project-*.html` page with an image such as `<img src="images/your-project-image.png" alt="Description of your work">`. Add the image to `images/` first.
- Update the résumé file at `CV/Pasindu Lakshan Resume.pdf` when you replace your CV. Keep its filename, or update the download link in `index.html`.

## Contact form behavior

The contact forms use a `mailto:` link because the site is static and the uploaded source did not include a server endpoint. Submitting validates the fields and opens the visitor's default email app with a draft addressed to `lakshanpasindu0908@gmail.com`; the visitor still needs to press Send. Direct in-page sending would require a backend or a form service.

## Before publishing

1. Check every external social profile link.
2. Replace the placeholder art with your actual renders, gameplay screenshots and prototype photos as these become available.
3. Test the website on desktop and mobile after uploading.
