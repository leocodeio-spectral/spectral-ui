// vite.config.ts
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy
} from "file:///home/leo/Desktop/leo-ext/self/production/spectral/spectral-ui/node_modules/.pnpm/@remix-run+dev@2.15.2_@remix-run+react@2.15.2_react-dom@18.3.1_react@18.3.1__react@18.3_c96e150fc7ed5b0a0cb6141c22640a66/node_modules/@remix-run/dev/dist/index.js";
import { flatRoutes } from "file:///home/leo/Desktop/leo-ext/self/production/spectral/spectral-ui/node_modules/.pnpm/remix-flat-routes@0.6.5_@remix-run+dev@2.15.2_@remix-run+react@2.15.2_react-dom@18.3.1__f6502b09b724fda024c5fee60563f2a0/node_modules/remix-flat-routes/dist/index.js";
import { defineConfig } from "file:///home/leo/Desktop/leo-ext/self/production/spectral/spectral-ui/node_modules/.pnpm/vite@5.4.14_@types+node@22.10.10/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///home/leo/Desktop/leo-ext/self/production/spectral/spectral-ui/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.3_vite@5.4.14_@types+node@22.10.10_/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true
      }
    }),
    tsconfigPaths()
  ],
  server: {
    hmr: {
      overlay: true
    }
  },
  clearScreen: false
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sZW8vRGVza3RvcC9sZW8tZXh0L3NlbGYvcHJvZHVjdGlvbi9zcGVjdHJhbC9zcGVjdHJhbC11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbGVvL0Rlc2t0b3AvbGVvLWV4dC9zZWxmL3Byb2R1Y3Rpb24vc3BlY3RyYWwvc3BlY3RyYWwtdWkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbGVvL0Rlc2t0b3AvbGVvLWV4dC9zZWxmL3Byb2R1Y3Rpb24vc3BlY3RyYWwvc3BlY3RyYWwtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge1xuICB2aXRlUGx1Z2luIGFzIHJlbWl4LFxuICBjbG91ZGZsYXJlRGV2UHJveHlWaXRlUGx1Z2luIGFzIHJlbWl4Q2xvdWRmbGFyZURldlByb3h5LFxufSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXZcIjtcbmltcG9ydCB7IGZsYXRSb3V0ZXMgfSBmcm9tIFwicmVtaXgtZmxhdC1yb3V0ZXNcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVtaXhDbG91ZGZsYXJlRGV2UHJveHkoKSxcbiAgICByZW1peCh7XG4gICAgICByb3V0ZXM6IGFzeW5jIChkZWZpbmVSb3V0ZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIGZsYXRSb3V0ZXMoXCJyb3V0ZXNcIiwgZGVmaW5lUm91dGVzKTtcbiAgICAgIH0sXG4gICAgICBmdXR1cmU6IHtcbiAgICAgICAgdjNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXG4gICAgICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgICAgICB2M190aHJvd0Fib3J0UmVhc29uOiB0cnVlLFxuICAgICAgICB2M19zaW5nbGVGZXRjaDogdHJ1ZSxcbiAgICAgICAgdjNfbGF6eVJvdXRlRGlzY292ZXJ5OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIGhtcjoge1xuICAgICAgb3ZlcmxheTogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICBjbGVhclNjcmVlbjogZmFsc2UsXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFc7QUFBQSxFQUMxVyxjQUFjO0FBQUEsRUFDZCxnQ0FBZ0M7QUFBQSxPQUMzQjtBQUNQLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLHdCQUF3QjtBQUFBLElBQ3hCLE1BQU07QUFBQSxNQUNKLFFBQVEsT0FBTyxpQkFBaUI7QUFDOUIsZUFBTyxXQUFXLFVBQVUsWUFBWTtBQUFBLE1BQzFDO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixtQkFBbUI7QUFBQSxRQUNuQixzQkFBc0I7QUFBQSxRQUN0QixxQkFBcUI7QUFBQSxRQUNyQixnQkFBZ0I7QUFBQSxRQUNoQix1QkFBdUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWE7QUFDZixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
