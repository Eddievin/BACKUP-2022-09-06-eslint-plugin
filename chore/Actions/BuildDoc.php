<?php

namespace Actions;

use Skylib\Config\Assert;

class BuildDoc
{
  public static function do(): void
  {
    foreach (array_diff(Assert::strings(scandir('docs')), ['.', '..']) as $basename)
    {
      unlink('docs/'.$basename);
    }

    copy('README.md', 'docs/index.md');

    foreach (array_diff(Assert::strings(scandir('src/rules')), ['.', '..']) as $basename)
    {
      if (str_ends_with($basename, '.md'))
      {
        $contents = Assert::string(file_get_contents('src/rules/'.$basename));

        preg_match('`^\#\s([^\r\n]+)`imsuxDX', $contents, $matches);

        $title = trim($matches[1]);

        file_put_contents(
          'docs/'.$basename,
          '[ESLint plugin](index.md) / '.$title."\n\n".$contents
        );
      }
    }
  }
}
