// Post-build script to copy .well-known folder to .next output
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'public', '.well-known');
const targetDir = path.join(__dirname, '..', '.next', '.well-known');

try {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy files
  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`✅ Copied ${file} to .next/.well-known/`);
    });
    console.log('✅ .well-known folder copied successfully!');
  } else {
    console.log('⚠️ Source .well-known folder not found');
  }
} catch (error) {
  console.error('❌ Error copying .well-known folder:', error);
  process.exit(1);
}

