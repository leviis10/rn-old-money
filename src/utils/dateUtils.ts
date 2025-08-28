export function formatDate(date?: Date): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formatter.format(date);
}
