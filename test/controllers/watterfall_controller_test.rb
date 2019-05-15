require 'test_helper'

class WatterfallControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get watterfall_index_url
    assert_response :success
  end

end
