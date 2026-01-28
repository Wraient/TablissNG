---
sidebar_position: 2
---

# Building from Source

This document provides detailed instructions for building TablissNG from its source code.

## System Requirements

### Required Software

- Node.js Version: 22.x or higher

## Build Script

A convenience build script is provided to automate the build process for Firefox. Save this as `build.sh` (Linux/macOS) or `build.bat` (Windows) in the project root:

### Windows (build.bat)

```batch
@echo off

echo Building Tabliss Extension...

:: Check Node.js installation
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed
    exit /b 1
)

:: Install dependencies
echo Installing dependencies...
call npm install || (
    echo Error: Failed to install dependencies
    exit /b 1
)

:: Build Firefox extension
echo Building Firefox extension...
call npm run build:firefox || (
    echo Error: Build failed
    exit /b 1
)

:: Zip the build output
echo Zipping build output...
powershell Compress-Archive -Path dist/firefox/* -DestinationPath dist/firefox.zip || (
    echo Error: Failed to zip build output
    exit /b 1
)

echo Build completed successfully!
echo Firefox extension is available in dist/firefox/
echo Zipped archive available at dist/firefox.zip
```

### Linux/macOS (build.sh)

```bash
#!/bin/bash

set -e

echo "Building Tabliss Extension..."

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build Firefox extension
echo "Building Firefox extension..."
npm run build:firefox

# Ensure the output directory exists
if [ ! -d "dist/firefox" ]; then
    echo "Error: Build output directory does not exist!"
    exit 1
fi

# Zip the build output while preserving directory structure
echo "Zipping build output..."
cd dist/firefox
zip -r ../firefox.zip ./*
cd ../..

echo "Build completed successfully!"
echo "Firefox extension is available in dist/firefox/"
echo "Zipped archive available at dist/firefox.zip"
```

Make the script executable on Linux/macOS:

```bash
chmod +x build.sh
```

## Support

If you encounter any issues during the build process, please:

1. Check the [GitHub Issues](https://github.com/BookCatKid/TablissNG/issues) page
2. Create a new issue if your problem hasn't been reported
