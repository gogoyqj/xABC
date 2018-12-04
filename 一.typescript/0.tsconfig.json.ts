// # 配置
{
  const config = {
    "compilerOptions": {
      "baseUrl": ".",
      "outDir": "build/dist",
      "module": "esNext",
      "target": "es3",
      "lib": ["esnext", "dom"],
      "sourceMap": true,
      "allowJs": true,
      "jsx": "react",
      "moduleResolution": "node",
      "noEmitHelpers": true,
      "rootDir": ".",
      "experimentalDecorators": true,
      "forceConsistentCasingInFileNames": true,
      "noImplicitReturns": true,
      "noImplicitThis": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "suppressImplicitAnyIndexErrors": true,
      "noUnusedLocals": false,
      "importHelpers": true,
      "allowSyntheticDefaultImports": true,
      "typeRoots": ["node_modules/@types"],
      "traceResolution": false,
      "skipLibCheck": true,
      "paths": {
        "tslib": ["./node_modules/tslib/tslib"]
      }
    },
    "exclude": [
      "node_modules",
      "build",
      "scripts",
      "acceptance-tests",
      "webpack",
      "jest"
    ]
  }
}