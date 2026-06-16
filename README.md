# PEVIITOR.RO — Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fpeviitor.ro&label=peviitor.ro)](https://peviitor.ro)
[![API](https://img.shields.io/website?url=https%3A%2F%2Fapi.peviitor.ro%2Fv1%2F&label=api.peviitor.ro)](https://api.peviitor.ro/v1/)
[![SOLR](https://img.shields.io/website?url=https%3A%2F%2Fsolr.peviitor.ro%2Fsolr%2F&label=solr.peviitor.ro)](https://solr.peviitor.ro/solr/)
![GitHub Pages](https://img.shields.io/github/deployments/peviitor-ro/v01/github-pages?label=GitHub%20Pages)

Frontend for [peviitor.ro](https://peviitor.ro), a job search platform that aggregates jobs from multiple Romanian companies into a single searchable interface.

## Features

- Search jobs by keywords, location, or company
- Random job discovery
- Filter by work mode (remote, hybrid, on-site)
- Mobile-friendly responsive design
- No ads, no tracking, no account required

## Tech Stack

- Plain HTML, CSS, JavaScript (no frameworks)
- [peviitor.ro API v1](https://api.peviitor.ro/v1/) for job data
- Hosted on GitHub Pages

## Usage

Browse to [peviitor.ro](https://peviitor.ro) and start searching. No installation needed.

### Local Development

```bash
# Clone
git clone https://github.com/peviitor-ro/v01.git

# Serve with any static file server
python -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080` in your browser.

## API

This frontend uses the peviitor.ro API v1:

- `GET /v1/search/?q=<query>` — Search jobs
- `GET /v1/locations/` — List locations
- `GET /v1/random/` — Random job

See [api.peviitor.ro](https://api.peviitor.ro) for full documentation.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
