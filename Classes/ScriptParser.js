export default class ScriptParser {
	/**
	 * Komutu işler ve değişkenlerle değiştirir.
	 *
	 * @param {string} command - İşlenecek komut.
	 * @param {object} env - Çevre değişkenleri.
	 * @returns {string | number} - İşlenmiş komut.
	 */
	static Parse({ command = "", env = {} }) {
		return command.replace(/\$\[(.*?)\]/g, (match) => {
			const expression = match.slice(2, -1);
			try {
				const result = eval(expression);

				if (typeof result === "function") {
					return result({ command, env });
				} else if (typeof result === "string" || typeof result === "number") {
					return result;
				}

				throw new Error(`Beklenmedik değer: ${result}`);
			} catch (error) {
				throw new Error(`Kodda hata: ${error.message}`);
			}
		});
	}
}
