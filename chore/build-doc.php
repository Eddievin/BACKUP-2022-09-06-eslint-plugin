<?php

include_once __DIR__.'/init.php';

if (file_exists('docs'))
{
  // Already exists
}
else
{
  mkdir('docs');
}

foreach (scandir('docs') as $basename)
{
  if (str_ends_with($basename, '.md'))
  {
    unlink('docs/'.$basename);
  }
}

copy('README.md', 'docs/index.md');

foreach (scandir('src/rules') as $basename)
{
  if (str_ends_with($basename, '.md'))
  {
    $contents = file_get_contents('src/rules/'.$basename);

    preg_match('`^\#\s([^\r\n]+)`imsuxDX', $contents, $matches);

    $title = trim($matches[1]);

    file_put_contents(
      'docs/'.$basename,
      '[ESLint plugin](index.md) / '.$title."\n\n".$contents
    );
  }
}
