export function getUtcDate(dateString)
{
    if (!dateString)
    {
        return undefined;
    }

    const date = new Date(dateString);
    return date.toISOString();
}