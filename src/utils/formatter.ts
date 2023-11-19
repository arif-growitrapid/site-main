export function formatLikes(likes: number): string {
    const suffixes: string[] = ["", "K", "M", "B", "T"];
    const num: number = parseFloat(likes.toString());

    if (num < 1000) {
        return num.toString();
    }

    const tier: number = Math.floor(Math.log10(Math.abs(num)) / 3);
    const suffix: string = suffixes[tier - 1]; // Adjusted the index to start from 0
    const scale: number = Math.pow(10, tier * 3);

    const scaledNumber: number = num / scale;
    const formattedNumber: string = scaledNumber.toFixed(1).replace(/\.0$/, ""); // Remove '.0' for whole numbers

    return formattedNumber + suffix;
}
