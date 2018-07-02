export class FilterUtil {

  private constructor() {
  }

  /**
   * Creates a regular expression of the given filter text, and transforms asterisk (*) wildcard characters to match
   * any text (.*).
   */
  public static toFilterRegExp(filterText: string): RegExp {
    if (!filterText) {
      return null;
    }

    // Escape the user filter input and add wildcard support
    const escapedString = filterText.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    const wildcardString = escapedString.replace(/\\\*/g, '.*');
    return new RegExp(wildcardString, 'i');
  }
}
