# Roman Converter

## Overview

This is a full-stack web application built with React and Node.js, containerized with Docker, and integrated with Prometheus for monitoring. It is designed to provide a simple roman numeral converter.

## How to Build and Run the Project

### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose
- Node.js and Yarn (for local development)

### One-Click Start (Using Docker Compose)

To start the frontend, backend, and monitoring services, run the following command from the root directory:

```bash
docker-compose up --build
```

This will:

- Build Docker images for both frontend and backend
- Launch the frontend, backend, and Prometheus services

#### Usage Instructions

1. Open your browser and navigate to `http://localhost`. This will open the frontend page.
2. Enter a valid integer in the input field.
3. Click the **Convert** button.
4. This action will trigger a request to the backend and show the result:

    ```text
    http://localhost:8080/romannumeral?query={integer}
    ```

If you encounter any issues, check the console output for error messages or visit Prometheus at `http://localhost:9090` to view metrics and logs.

#### Viewing Adaptive Theme (Dark/Light Mode)

To simulate and test the theme switch in the browser, take Chrome as a example:

**In Chrome:**

1. Developer Tools -> Rendering tab (under **More tools** if not visible)
2. Under **Emulate CSS media feature prefers-color-scheme**, select:
   - **Light** to see the light theme
   - **Dark** to see the dark theme
3. The application should automatically adjust its theme according to your selection.

### Local Development

#### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Start the development server:

    ```bash
    yarn start
    ```

    The frontend will be available at `http://localhost:3000`

#### Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Start the development server:

    ```bash
    yarn start
    ```

    The backend will be available at `http://localhost:8080`

## Engineering and Testing Methodology

### Engineering Methodology

- The frontend is built with React and TypeScript, while the backend is powered by Node.js and Express.
- Docker is used for containerization to ensure consistency between development and production environments.
- Nginx is configured as a static resource server for the frontend.

### Testing Methodology

- Tests are written using Jest and React Testing Library.
- Run tests for both frontend and backend with:

    ```bash
    yarn test
    ```

## Packaging Layout (Directory Structure)

```
project
├── frontend                 # Frontend code
│   ├── src                  # React components and pages
│   ├── public               # Static assets
│   ├── Dockerfile           # Frontend Docker image configuration
│   ├── package.json         # Frontend dependencies
│   └── tsconfig.json        # TypeScript configuration
│
├── backend                  # Backend code
│   ├── src                  # Business logic and routes
│   ├── Dockerfile           # Backend Docker image configuration
│   ├── package.json         # Backend dependencies
│   └── jest.config.js       # Testing configuration
│
├── prometheus               # Prometheus configuration
│   └── prometheus.yml       # Prometheus monitoring settings
│
├── docker-compose.yml       # Docker Compose configuration
├── Specification.md         # Roman Numerals Specification
└── README.md                # Project documentation
```

## Dependency Attribution

### Frontend (frontend)

- React: Frontend framework
- TypeScript: Static type checking
- React Spectrum: UI library
- Jest: Testing framework
- React Testing Library (RTL): Testing library for React
- Nginx: Static resource server
- Detailed dependencies are listed in: `frontend/package.json`
  
### Justification for React Spectrum

- Accessibility: Built with accessibility as a priority, ensuring compliance with WCAG standards.
- Design Consistency: Provides a cohesive design system with components that maintain a consistent look and feel.
- Adaptiveness: Automatically adapts to different screen sizes and input methods, improving user experience on various devices.
- Customizability and Extensibility: Offers flexible theming options and allows developers to extend or customize components as needed.

### Backend (backend)

- Node.js: Runtime environment
- Jest: Testing framework
- Morgan: HTTP request logger middleware for Node.js.
- Prom-Client: Prometheus client for Node.js, enabling application-level monitoring and metrics exposure.
- Winston: Logging library for Node.js, providing customizable and structured logging.
- Detailed dependencies are listed in: `backend/package.json`

### Docker and Monitoring

- Docker: Containerization
- Docker Compose: Multi-container orchestration
- Prometheus: Monitoring and alerting system
This project is licensed under the MIT License.