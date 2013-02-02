#
# Methods placed in this module can be used inside of any view.
# View helpers allow you to encapsalate complex logic and keep your
# views pristine.
#
module ViewHelpers
  def html
    if @flat_html == true
      return ".html"
    else
      return ""
    end
  end
end