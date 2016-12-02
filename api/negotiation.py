from rest_framework.negotiation import DefaultContentNegotiation
from rest_framework.renderers import JSONRenderer

class IgnoreClientContentNegotiation(DefaultContentNegotiation):

    def select_renderer(self, request, renderers, format_suffix):
        """
        Select the first renderer in the `.renderer_classes` list.
        """
        content_type = request.GET.get('format')
        if content_type:
            return super().select_renderer(request, renderers, format_suffix)
        else:
            return (JSONRenderer(), JSONRenderer.media_type)
