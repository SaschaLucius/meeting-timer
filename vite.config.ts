import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			// PWA options
			manifest: {
				theme_color: '#8936FF',
				background_color: '#2EC6FE',
				icons: [
					{ purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
					{ purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' }
				],
				orientation: 'any',
				display: 'standalone',
				lang: 'en-GB',
				name: 'Flow Timer',
				short_name: 'FT',
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

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
