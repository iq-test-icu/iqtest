# Source-of-truth note
The only wordmark/icon files that exist in this repo are public/wordmark.png and
public/icon.png. Do not re-add copies under brand/ — every duplicate is another file
that can drift out of sync and get referenced by mistake. Header (index.html line ~1045)
and footer (~1242) both reference /wordmark.png via absolute path — keep it that way,
never a relative path, so it resolves the same regardless of which page/route serves it.
