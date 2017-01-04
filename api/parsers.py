from rest_framework.parsers import BaseParser
import json, codecs

class PlainTextParser(BaseParser):
    """
    Plain text parser.
    """
    media_type = 'text/plain'
    format = 'text'

    def parse(self, stream, media_type=None, parser_context=None):
        """
        Simply return a string representing the body of the request.
        """
        return json.loads(stream.read().decode())