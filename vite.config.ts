import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			// PWA options
			manifest: {
				theme_color: '#17637f',
				background_color: '#2EC6FE',
				icons: [
					{ purpose: 'any', sizes: '512x512', src: 'icon512.png', type: 'image/png' }
				],
				orientation: 'any',
				display: 'standalone',
				lang: 'en-GB',
				name: 'Flow Timer',
				short_name: 'Flow Timer',
				start_url: 'https://flow-timer.de/',
				scope: 'https://flow-timer.de/'
			},
			// Additional options
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
				maximumFileSizeToCacheInBytes: 10 * 1024 ** 2 // 10mb
			}
		})
	],
	define: {
		'process.env.NODE_ENV': '"production"',
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
