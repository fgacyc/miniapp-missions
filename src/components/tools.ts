export function capitalizeAllFirstLetters(str: string): string {
    str = str.replace(/-/g, " ").replace(/_/g, " ");
    return str.replace(/\b\w/g, char => char.toUpperCase());
}