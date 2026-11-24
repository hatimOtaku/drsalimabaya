# Dr Salima Baya website

Static website in French and Arabic (HTML, CSS and JavaScript). There is no build step.

## Publish with GitHub Pages

1. Open the repository on GitHub, then **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then click **Save**.
4. After GitHub finishes deploying, the site is at <https://hatimotaku.github.io/drsalimabaya/>.

The empty `.nojekyll` file tells GitHub Pages to publish the files as they are.

If you add a custom domain or rename the repository, update the `og:url` and `og:image` addresses in `index.html`.

## Preview on your computer

Run this inside the project folder, then open <http://localhost:5173>:

    python -m http.server 5173

## Edit the content

- Contact details, services, translations and result photos: `js/data.js`
- Images: see `assets/README.md`

Only publish patient photos that have written patient consent.
